const { contextBridge, ipcRenderer, BrowserWindow } = require("electron");

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) =>{
            let validChannels = ["toMain"];
            if(validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },

        receive: (channel, func) => {
            let validChannels = ["fromMain"];
            if(validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
)

function requestNewProjectPrompt () {
    console.log("Requesting prompt for new project")
    ipcRenderer.send('newProjPrompt')
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: "./static/preload.js"
        }
    });
    win.loadFile("./static/addProject.html");
}

global.requestNewProjectPrompt = requestNewProjectPrompt;