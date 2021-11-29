const fs = require('fs');
const os = require('os');

// Set Home folder path

const syncDirectory = `${os.homedir()}\\Contraly`; 

// create directory

function createDirectory(dir) {
    try {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            console.log("Sync directory is created");
        }

        else {
            console.log("Directory already exists");
        }
    }

    catch (err) {
        console.log(err);
    }
}

// create Contrarly directory in User's home folder

function createContralyDir(dir) {
    createDirectory(dir);
}

module.exports = {
    syncDirectory,
    createDirectory,
    createContralyDir
}