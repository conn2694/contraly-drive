

function startWatcher(path) {
    const hound = require('hound');

    watcher = hound.watch(path);


    watcher.on('create', function(file, stats) {
        console.log(file + ' was created')
    })
    watcher.on('change', function(file, stats) {
        console.log(file + ' was changed')
    })
    watcher.on('delete', function(file) {
        console.log(file + ' was deleted')
    })
}

module.exports = {
    startWatcher
}