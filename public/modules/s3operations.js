// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
const config = require('config');
const fs = require('fs');

// Set the region 
AWS.config = new AWS.Config();
AWS.config.accessKeyId = config.awsKey;
AWS.config.secretAccessKey = config.awsPass;
AWS.config.region = 'us-east-2';

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});



// Adds a file to a bucket
function uploadFile(bucket, pathFile, s3Path) {

    // call S3 to retrieve upload file to specified bucket
    bucketParams = {
        Bucket: bucket, 
        Key: s3Path, 
        Body: ''
    };
    file = pathFile;

    // Configure the file stream and obtain the upload parameters
    fileStream = fs.createReadStream(file);
    fileStream.on('error', function(err) {
    console.log('File Error', err);
    });
    bucketParams.Body = fileStream;
    path = require('path');

    // call S3 to retrieve upload file to specified bucket
    s3.upload (bucketParams, function (err, data) {
    if (err) {
        console.log("Error", err);
    } if (data) {
        console.log("Upload Success", data.Location);
    }
    });
    
}

// Takes our credentials and uses them to get a list of all the buckets associated with the user
function listBuckets() {

    // Call S3 to list the buckets
    s3.listBuckets(function(err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data.Buckets);
    }
    });
}

// Creates a bucket with the name of the parameter passed in
function createBucket(bucketName) {
    // Create the parameters for calling createBucket
    bucketParams = {
        Bucket : bucketName
    };
    
    // call S3 to create the bucket
    s3.createBucket(bucketParams, function(err, data) {
        if (err) {
        console.log("Error", err);
        } else {
        console.log("Success", data.Location);
        }
    });
}

// List all the objects within a bucket
function listObjects(bucketName, folder = '') {
    // Create the parameters for calling listObjects
    bucketParams = {
        Bucket : bucketName,
        Delimiter: '/',
        Prefix: folder
    };
    
    // Call S3 to obtain a list of the objects in the bucket
    return s3.listObjects(bucketParams).promise();
    

}

// Delete a bucket and it's objects
function deleteBucket(bucketName) {

    // Create params for S3.deleteBucket
    bucketParams = {
        Bucket : bucketName
    };
    
    // Call S3 to delete the bucket
    s3.deleteBucket(bucketParams, function(err, data) {
        if (err) {
        console.log("Error", err);
        } else {
        console.log("Success", data);
        }
    });

}

// Download file from s3 onto local storage
function downloadFile(bucketName, s3Path, localPath) {
    params = {
        Key: s3Path,
        Bucket: bucketName
    }
    s3.getObject(params, function(err, data) {
        if (err) {
            throw err
        }
        fs.writeFileSync(localPath, data.Body)
        console.log('file downloaded successfully')
    })

}

// delete file from s3 storage
function deleteFile(bucketName, s3Path) {
    params = {
        Key: s3Path,
        Bucket: bucketName
    }
    s3.deleteFile(params, function(err, data) {
        if (err) {
            console.log("Error", err);
            } else {
            console.log("Success", data);
            }
        });

}

// Get file information
function getFileInfo(bucketName, s3Path) {
    params = {
        Key: s3Path,
        Bucket: bucketName
    }
    return s3.headObject(params).promise();
    

}

module.exports = {
    uploadFile,
    listBuckets,
    createBucket, 
    listObjects,
    deleteBucket,
    downloadFile,
    deleteFile,
    getFileInfo
}