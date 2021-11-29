const sync = require("./syncDirectory");
const s3ops = require("./s3operations");
const syncDir = require("./syncDirectory")
const fs = require('fs');
var async = require("async");


async function syncToS3(project, localFolder, s3Path='') {

    // Now check for new files and updates
    fs.readdir(localFolder, (err, files) => {
        // asyncronous for
        for (const file of files) {

            // Folder operations
            if (fs.statSync(localFolder + '\/' + file).isDirectory()) {
                // Go inside the folder and sync all the contents recursively
                syncToS3(project, localFolder + '\/' + file, s3Path + '\/' + file);
            }
            // File Operations
            else {
                // gets rid of initial '/' character
                const uploadPath = (s3Path + '\/' + file).substring(1);

                s3ops.getFileInfo(project, uploadPath)
                // File exists
                .then(data => {
                    // Because we're uploading to amazon and are using versioning, we can just make a new
                    // version of the file, no need to overwrite. But we only want to do that if it's a different
                    // file
                    if (data.ContentLength != fs.statSync(localFolder + '\/' + file).size) {
                        s3ops.uploadFile(project, localFolder + '\/' + file, uploadPath);
                    }
                })
                // No file exists
                .catch(error =>
                    s3ops.uploadFile(project, localFolder + '\/' + file, uploadPath)
                );


            }
        };
    });
}


function syncFromS3(project, path, localFolder) {
    // Now check for new files and updates
    s3ops.listObjects(project, path).then(data => {
        // get all folders
        console.log(data);
        if ('CommonPrefixes' in data) {
            data.CommonPrefixes.forEach(folder => {
                // check here to create the folder on local if it doesn't exits
                // code here
                if (!fs.existsSync(localFolder + '\/' + project + '\/' + folder.Prefix)) {
                    fs.mkdirSync(localFolder + '\/' + project + '\/' + folder.Prefix);
                }
                syncFromS3(project, folder.Prefix, localFolder)

            })
        }
        // Use this section to scan files and update them if they have different file sizes
        if ('Contents' in data) {
            data.Contents.forEach(file => {

                s3ops.getFileInfo(project, file.Key)
                // File exists
                .then(fileInfo => {

                    // Because we're uploading to amazon and are using versioning, we can just make a new
                    // version of the file, no need to overwrite. But we only want to do that if it's a different
                    // file
                    if (fileInfo.ContentLength != fs.statSync(localFolder + '\/' + project + '\/' + file.Key).size
                    &&  fileInfo.ContentLength > 0) {
                        s3ops.downloadFile(project, file.Key, localFolder + '\/' + project + '\/' + file.Key);
                    }
                })
                // No file exists
                .catch(() => {
                    // Amazon has a quirk where it returns folders as files sometimes. This check works around that.
                    if (file.Size > 0) {
                        s3ops.downloadFile(project, file.Key, localFolder + '\/' + project + '\/' + file.Key);
                    }
                });

            })
        }
    });  

}

function syncToNas(project, localFolder, NASFolder) {

}

function syncFromNas(project, localFolder, NASFolder) {

}

module.exports = {
    syncToS3,
    syncFromS3
}