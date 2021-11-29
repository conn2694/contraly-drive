const {Notification} = require('electron')

function customNotification(title, subtitle, message){
    new Notification({
        title: `${title}`,
        subtitle: `${subtitle}`,
        body: `${message}`,
        silent: true,
        icon: './public/resources/Picture14.png'
    }).show();
}

function notification(body){
    customNotification("Contraly Drive", "", body);
}

module.exports = {
    customNotification,
    notification
}