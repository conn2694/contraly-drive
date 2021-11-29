const { createDirectory } = require("./syncDirectory");
const sql = require("./sqlModule");

//TODO: Works mostly, just need to double check when and where connection is being closed.

function createFreestyleFolder(path) {
    //create just the directory
    if (path == null)
        return;
    createDirectory(path);
    sql.startConnection();
    sql.insertProject({ name: path.replace(/^.*[\\\/]/, '') }, (res) =>{
        sql.insertFolder({ name: path.replace(/^.*[\\\/]/, ''), autosync: true, Project_idProject: res.insertId })
        sql.endConnection();
    })    
    

}

/**
 * @param {String} path The path to the root directory of the project
 */
function createSimpleProjectFolder(path) {
    //create the base directory
    //scripts, raws, notes, audio, stills, and images and titles
    createDirectory(path);
    let projName = path.replace(/^.*[\\\/]/, '');
    createSubDirectory(path, "\\scripts");
    createSubDirectory(path, "\\raws");
    createSubDirectory(path, "\\notes");
    createSubDirectory(path, "\\audio");
    createSubDirectory(path, "\\stills");
    createSubDirectory(path, "\\titles");

    let projId;
    sql.startConnection();
    sql.insertProject({ name: projName }, (res) => {
        console.log(res);
        projId = res.insertId;

        console.log(`Project_idProject = ${projId}`)

        sql.insertFolder({ name: projName, autosync: true, Project_idProject: projId })

        sql.insertFolder({ name: `${projName}\\scripts`, autosync: true, Project_idProject: projId })
        sql.insertFolder({ name: `${projName}\\raws`, autosync: true, Project_idProject: projId })
        sql.insertFolder({ name: `${projName}\\notes`, autosync: true, Project_idProject: projId })
        sql.insertFolder({ name: `${projName}\\audio`, autosync: true, Project_idProject: projId })
        sql.insertFolder({ name: `${projName}\\stills`, autosync: true, Project_idProject: projId })
        sql.insertFolder({ name: `${projName}\\titles`, autosync: true, Project_idProject: projId })
        sql.endConnection();
    });

}

function createFullProjectFolder(path) {
    let projName = path.replace(/^.*[\\\/]/, '');

    createDirectory(path);
    createSubDirectory(path, "\\pre-production");
    createSubDirectory(path, "\\pre-production\\scripts");
    createSubDirectory(path, "\\pre-production\\storyboards");
    createSubDirectory(path, "\\pre-production\\budgets");
    createSubDirectory(path, "\\pre-production\\contracts");
    createSubDirectory(path, "\\pre-production\\casting");
    createSubDirectory(path, "\\production");
    createSubDirectory(path, "\\production\\dailies");
    createSubDirectory(path, "\\post-production");
    createSubDirectory(path, "\\post-production\\editing");
    createSubDirectory(path, "\\post-production\\VFX");
    createSubDirectory(path, "\\post-production\\sound");
    createSubDirectory(path, "\\post-production\\DI");
    createSubDirectory(path, "\\post-production\\conforming");
    createSubDirectory(path, "\\delivery");

    let projId;

    sql.startConnection();
    sql.insertProject({ name: projName }, (res) => {
        console.log(res);
        projId = res.insertId;

        sql.insertFolder({ name: projName, autosync: true, Project_idProject: projId })
        sql.insertFolder({ name: `${projName}\\pre-production`, autosync: true, Project_idProject: projId })
        sql.insertFolder({ name: `${projName}\\pre-production\\scripts`, autosync: true, Project_idProject: projId })
        sql.insertFolder({ name: `${projName}\\pre-production\\storyboards`, autosync: true, Project_idProject: projId })
        sql.insertFolder({ name: `${projName}\\pre-production\\budgets`, autosync: true, Project_idProject: projId })
        sql.insertFolder({ name: `${projName}\\pre-production\\contracts`, autosync: true, Project_idProject: projId })
        sql.insertFolder({ name: `${projName}\\pre-production\\casting`, autosync: true, Project_idProject: projId })
        sql.insertFolder({ name: `${projName}\\production`, autosync: true, Project_idProject: projId })
        sql.insertFolder({ name: `${projName}\\production\\dailies`, autosync: true, Project_idProject: projId })
        sql.insertFolder({ name: `${projName}\\post-production`, autosync: true, Project_idProject: projId })
        sql.insertFolder({ name: `${projName}\\post-production\\editing`, autosync: true, Project_idProject: projId })
        sql.insertFolder({ name: `${projName}\\post-production\\VFX`, autosync: true, Project_idProject: projId })
        sql.insertFolder({ name: `${projName}\\post-production\\sound`, autosync: true, Project_idProject: projId })
        sql.insertFolder({ name: `${projName}\\post-production\\DI`, autosync: true, Project_idProject: projId })
        sql.insertFolder({ name: `${projName}\\post-production\\conforming`, autosync: true, Project_idProject: projId })
        sql.insertFolder({ name: `${projName}\\delivery`, autosync: true, Project_idProject: projId })
        sql.endConnection();
    });
}

/**
 * 
 * @param {String} root The root directory of the entire project
 * @param {String} dir The new subdirectory. An example might be "\\pre-production\\"
 */
function createSubDirectory(root, dir) {
    createDirectory(`${root}${dir}`);
}

module.exports = {
    createFreestyleFolder,
    createSimpleProjectFolder,
    createFullProjectFolder,
}