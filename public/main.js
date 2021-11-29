const { app, Menu, Tray, BrowserWindow, shell, ipcMain, dialog } = require("electron");
const projectSync = require('./modules/projectSync');
const s3 = require("./modules/s3operations");
const config = require('config');
const notify = require('./modules/notificationsModule');
const sql = require('./modules/sqlModule');
const sync = require('../src/modules/syncDirectory');
const proj = require('../src/modules/projectModule');
const notify = require('../src/modules/notificationsModule');
const sql = require('../src/modules/sqlModule');

let tray, win, child;
let firstOpen = true;

//Create the app window
function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: "./static/preload.js",
            contextIsolation: false,
            enableRemoteModule: true,
            nodeIntegration: true,
        }
    });
    // and load the index.html of the app.
    //win.loadFile("./public/static/index.html");
    win.loadURL('http://localhost:3000/')

    // create sync directory
    if (firstOpen === true) {
        sync.createContralyDir(sync.syncDirectory);
        firstOpen = false;
    }

    // Pin sync directory to quick access on windows OS
    if (process.platform === "win32") {
        const { exec } = require('child_process');
        exec("(New-Object -ComObject shell.application).NameSpace('" + sync.syncDirectory + "').Self.InvokeVerb('pintohome')", { 'shell': 'powershell.exe' }, (error, stdout, stderr) => {
        })
    }
    //Pin sync directory to finder favorites macOS
    else if (process.platform === "darwin") {
        const { exec } = require('child_process');
        exec("loggedInUser=`/bin/ls -l /dev/console | /usr/bin/awk '{ print $3 }'` && if [ -e /usr/bin/sfltool ] && then && /usr/bin/sfltool add-item com.apple.LSSharedFileList.FavoriteItems && file:///Users/$loggedInUser/contraly && sleep 2 && touch /Users/$loggedInUser/.sidebarshortcuts && fi && exit 0", (error, stdout, stderr) => {
            if (error != null) {
                console.log(error)
            }
        })
    }
}

//Create the system tray icon with menu
//https://www.electronjs.org/docs/api/app#event-ready
app.whenReady().then(() => {
    tray = new Tray("./public/resources/Picture14.png")
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Empty Application',
            enabled: false
        },

        {
            label: 'Settings',
            click: function () {
                console.log("Clicked on settings")
            }
        },
        {
            label: 'Sync to Local',
            click: function () {
                projectSync.syncFromS3('contralybucket', '', sync.syncDirectory)
            }
        },
        {
            label: 'Sync to Cloud',
            click: function () {
                projectSync.syncToS3('contralybucket', sync.syncDirectory + '\/' + 'contralybucket', '')
            }
        },

        {
            label: 'Open Sync Folder',
            click: function () {
                shell.openPath(sync.syncDirectory);
                //downTest('contralybucket', '') 
       //s3.getFileInfo('contralybucket', 'testman.png').then(
                //    data => console.log(data.ContentLength)).catch(() => console.log('file not found'));

                //console.log("size of file: ", fs.statSync("testman.png").size)



            }
        },

        {
            label: 'New Project',
            submenu: [
                //display a menu for all the new project options
                //free-style: single folder
                {
                    label: 'Free-style Project',
                    click: function () {
                        var loc = dialog.showSaveDialogSync({
                            defaultPath: sync.syncDirectory,
                            properties: [
                                'promptToCreate'
                            ]
                        });
                        proj.createFreestyleFolder(loc);

                    }
                },
                //simple project: project with some basic folders
                {
                    label: 'Simple Project',
                    click: function () {
                        var loc = dialog.showSaveDialogSync({
                            defaultPath: sync.syncDirectory,
                            properties: [
                                'promptToCreate'
                            ]
                        });
                        proj.createSimpleProjectFolder(loc);
                    }
                },
                //large project: full package
                {
                    label: 'Full Project',
                    click: function () {
                        var loc = dialog.showSaveDialogSync({
                            defaultPath: sync.syncDirectory,
                            properties: [
                                'promptToCreate'
                            ]
                        });
                        proj.createFullProjectFolder(loc);
                    }
                }
            ]

        },


        {
            label: 'Help',
            click: function () {
                console.log("Clicked on Help")
            }
        },

        {
            label: 'Exit',
            click: function () {
                //Exit the program, shut it all down

                app.quit();
            }
        },

        {
            label: 'Sync',
            click: function () {
                //First update the local to be up to date with files on the cloud

                //Now Sync from local to cloud
                syncToFolder(srcFolder, destFolder);
            }
        },

        {
            label: 'Menu',
            click: function () {
                createWindow();
                win.show();
            }
        }
    ])
    tray.setToolTip('Contraly Drive')
    tray.setContextMenu(contextMenu)
})

//App started and ready, create window
//https://www.electronjs.org/docs/api/app#event-ready
app.on("ready", () => {
    //Open the window
    createWindow();

    //Set the appID by platform. Windows will show electron.app.Electron otherwise.
    //Windows is moving to 64-bit but looks like Electron just says win32 anyway
    if (process.platform === 'win32') {
        app.setAppUserModelId("Contraly Drive");
    }
});

//User pressed the X-close button
//https://www.electronjs.org/docs/api/app#event-window-all-closed
app.on("window-all-closed", () => {
    //On close hide the window. Closing done via tray icon
    win.on("close", () => {
        win.hide();
    });
    notify.customNotification("Contraly Drive", "Contraly Drive running in background", "Contraly Drive is still running in the background. You can access it via the system tray icon.")

});

ipcMain.on("freestyleRequest", (event, args) => {
    var window = BrowserWindow.getFocusedWindow();
    window.close();
    var loc = dialog.showSaveDialogSync({
        defaultPath: sync.syncDirectory,
        properties: [
            'promptToCreate'
        ]
    });
    proj.createFreestyleFolder(loc);
});

ipcMain.on("simpleProjectRequest", (event, args) => {
    var window = BrowserWindow.getFocusedWindow();
    window.close();
    var loc = dialog.showSaveDialogSync({
        defaultPath: sync.syncDirectory,
        properties: [
            'promptToCreate'
        ]
    });
    proj.createSimpleProjectFolder(loc);
});

ipcMain.on("fullProjectRequest", (event, args) => {
    var window = BrowserWindow.getFocusedWindow();
    window.close();
    var loc = dialog.showSaveDialogSync({
        defaultPath: sync.syncDirectory,
        properties: [
            'promptToCreate'
        ]
    });
    proj.createFullProjectFolder(loc);
});

ipcMain.on("newProjPrompt", (event, arg) => {
    child = new BrowserWindow({
        width: 250,
        height: 150,
        frame: false,
        titleBarStyle: 'hidden',
        modal: true,
        parent: win,
        show: false,
        x: win.x,
        y: win.y,
        webPreferences: {
            preload: "./public/static/preload.js",
            nodeIntegration: true,
            contextIsolation: false,
        },
        resizable: false,
    });
    child.loadFile("./public/static/addProject.html");
    child.once('ready-to-show', () => {
        child.show();
    })
})

ipcMain.handle("getProjects", async () => {
    const result = await sql.getProjectsPromise;
    return result;
})
