
/**
 * This whole thing will be revamped. Currently it connects directly to the SQL server, but
 * we will want to migrate over to using a restful service.
 */
const config = require('config');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: config.database.host,
    user: config.database.username,
    password: config.database.password,
    database: config.database.dbname
});

function startConnection() {
    connection.connect((err => {
        if (err) {
            //throw err;
            console.log("Error connecting to database, is it running?")
        } else {
            console.log("Connected");
        }

    }));
}

function endConnection() {
    connection.end((err) => {

    });
}

//Get All
const getAllProjects = new Promise(function (resolve, reject) {
    connection.query('SELECT * FROM project', (err, rows) => {
        if (err) {
            reject(err);
        }
        resolve(rows);
    })
});

const getAllUsers = new Promise(function (resolve, reject) {
    connection.query('SELECT * FROM user', (err, rows) => {
        if (err) {
            reject(err);
        }
        resolve(rows);
    })
});


const getAllProjectUsers = new Promise(function (resolve, reject) {
    connection.query('SELECT * FROM Project_has_User', (err, rows) => {
        if (err) {
            reject(err);
        }
        resolve(rows);
    })
});

const getAllFolders = new Promise(function (resolve, reject) {
    connection.query('SELECT * FROM folder', (err, rows) => {
        if (err) {
            reject(err);
        }
        resolve(rows);
    })
});

const getAllPermissions = new Promise(function (resolve, reject) {
    connection.query('SELECT * FROM permission', (err, rows) => {
        if (err) {
            reject(err);
        }
        resolve(rows);
    })
});

const getAllFiles = new Promise(function (resolve, reject) {
    connection.query('SELECT * FROM file', (err, rows) => {
        if (err) {
            reject(err);
        }
        resolve(rows);
    })
});

//Get
function getFoldersFromProject(projectId) {
    return new Promise(function (resolve, reject) {
        connection.query('SELECT * FROM folder where folder.Project_idProject = ?', projectId, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        })
    });
}

function getProject(id) {
    return new Promise(function (resolve, reject) {
        connection.query('SELECT * FROM project where idProject = ?', id, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        })
    });
}

function getUser(id) {
    return new Promise(function (resolve, reject) {
        connection.query('SELECT * FROM user where idUser = ?', id, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        })
    });
}

function getUserByUsername(userName) {
    return new Promise(function (resolve, reject) {
        connection.query('SELECT * FROM user where username = ?', userName, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        })
    });
}

function getProjectUser(userId, projId) {
    return new Promise(function (resolve, reject) {
        connection.query('SELECT * FROM Settings WHERE User_idUser = ? AND Project_idProject = ?', [userId, projId], (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        })
    });
}

function getFolder(id) {
    return new Promise(function (resolve, reject) {
        connection.query('SELECT * FROM Folder WHERE idFolder = ?', id, (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows)
        })
    });
}

function getPermission(id) {
    return new Promise(function (resolve, reject) {
        connection.query('SELECT * FROM Permission WHERE idPermission = ?', id, (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows)
        })
    });
}

function getFile(id) {
    return new Promise(function (resolve, reject) {
        connection.query('SELECT * FROM File WHERE idFile = ?', id, (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows)
        })
    });
}

//Insert

function insertProject(project) {
    return new Promise(function (resolve, reject) {
        connection.query('INSERT INTO Project SET ?', project, (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res)
        })
    });
}

function insertUser(obj) {
    return new Promise(function (resolve, reject) {
        connection.query('INSERT INTO User SET ?', obj, (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res)
        })
    });
}

function insertProjectUser(obj) {
    return new Promise(function (resolve, reject) {
        connection.query('INSERT INTO Project_has_User SET ?', obj, (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res)
        })
    });
}

function insertFolder(obj) {
    return new Promise(function (resolve, reject) {
        connection.query('INSERT INTO Folder SET ?', obj, (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res)
        })
    });
}

function insertPermission(obj) {
    return new Promise(function (resolve, reject) {
        connection.query('INSERT INTO Permission SET ?', obj, (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res)
        })
    });
}

function insertFile(obj) {
    return new Promise(function (resolve, reject) {
        connection.query('INSERT INTO File SET ?', obj, (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res)
        })
    });
}

//Update


//Delete
function deleteProject(id) {
    return new Promise(function (resolve, reject) {
        connection.query('DELETE * FROM Project WHERE idProject = ?', id, (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows)
        })
    });
}

function deleteUser(id) {
    return new Promise(function (resolve, reject) {
        connection.query('DELETE * FROM user WHERE idUser = ?', id, (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows)
        })
    });
}

function deleteProjectUser(userId, projId) {
    return new Promise(function (resolve, reject) {
        connection.query('DELETE * FROM Project_has_User WHERE Project_idProject = ? AND User_idUser = ?', [userId, projId], (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows)
        })
    });
}

function deleteFolder(id) {
    return new Promise(function (resolve, reject) {
        connection.query('DELETE * FROM Folder WHERE idFolder = ?', id, (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows)
        })
    });
}

function deletePermission(id) {
    return new Promise(function (resolve, reject) {
        connection.query('DELETE * FROM Permission WHERE idPermission = ?', id, (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows)
        })
    });
}

function deleteFile(id) {
    return new Promise(function (resolve, reject) {
        connection.query('DELETE * FROM file WHERE idFile = ?', id, (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows)
        })
    });
}

//Custom
function query(str) {
    return new Promise(function (resolve, reject) {
        connection.query(str, (err, rows) => {
            if (err) {
                reject(err)
            }
            resolve(rows)
        })
    });
}

module.exports = {
    startConnection,
    endConnection,
    getAllFiles,
    getAllFolders,
    getAllPermissions,
    getAllProjectUsers,
    getAllProjects,
    getAllUsers,
    getFile,
    getFolder,
    getPermission,
    getProject,
    getProjectUser,
    getUser,
    getUserByUsername,
    insertFile,
    insertFolder,
    insertPermission,
    insertProject,
    insertProjectUser,
    insertUser,
    deleteFile,
    deleteFolder,
    deletePermission,
    deleteProject,
    deleteProjectUser,
    deleteUser,
    query,
    getFoldersFromProject,
}