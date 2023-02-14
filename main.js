// Electron Side
const { app, Tray, Menu, nativeImage, dialog } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const showHelp = require('./src/frontend/popup')
const getPath = (fileName) => { return path.join(__dirname, fileName); }

let CONTAINING_FOLDER = getPath('src/logs');
let PLAYED_FILE = getPath('src/logs/movies_played.txt');
let MOVIE_FILE = getPath('src/logs/movie.txt');
let CONFIG_FILE = getPath('src/settings.json');
let EVENT_LOG = getPath('src/event.log');
let iconFolder = (icon) => getPath(`./src/icons/${icon}`);

const template = [{ label: 'OBS VLC Overlay', type: 'normal', enabled: false }, { type: 'separator' }, { label: "Open", submenu: [{ label: 'Logs - Open Containing Folder', type: 'normal', click: () => exec(`start ${CONTAINING_FOLDER}`) }, { type: "separator" }, { label: 'settings.json', type: 'normal', click: () => exec(`start ${CONFIG_FILE}`) }, { label: 'event.log', type: 'normal', click: () => exec(`start ${EVENT_LOG}`) }] }, { type: 'separator' }, { label: 'Help', type: 'normal', click: () => showHelp() }, { type: 'separator' }, { label: 'Exit application', type: 'normal', click: () => app.quit() }]

if (!app.requestSingleInstanceLock()) app.quit()
else {
    app.on('second-instance', () => {
        dialog.showMessageBox({
            title: "Information",
            type: 'info',
            message: 'Only a single instance of this application is allowed.',
            buttons: []
        })
    })
}

app.on('ready', () => {
    showHelp()
    let tray = new Tray(nativeImage.createFromPath(iconFolder('icon.ico')));
    tray.setToolTip('OBS VLC - Runtime Overlay')
    const contextMenu = Menu.buildFromTemplate(template)
    tray.setContextMenu(contextMenu)
})

app.on('window-all-closed', () => { return false; });

app.on('quit', () => clearFile(MOVIE_FILE))


// if (process.platform === 'win32') {
//     app.setAppUserModelId(app.name);
// }

// Node side

const colors = require('colors')
const fs = require('fs');

const VLC = require(getPath('/src/handlers/VLC'));
const Status = require(getPath('/src/utils/status-messages'))
const Configuration = require(getPath('/src/config/configuration'));
Configuration.init();
let settings = Configuration.settings.config;

const options = {
    method: "GET",
    timeout: 10000,
    url: `http://${settings.address}:${settings.port}/requests/status.json`,
    auth: {
        user: settings.auth.username,
        pass: settings.auth.password
    }
}


console.log(colors.rainbow('- - - OBS VLC Overlay Tool - - -'))

let title = '';

setInterval(async () => {
    try {
        const data = await VLC.getJSON(options)

        const formattedTitle = VLC.formatTitle(data.title, settings);
        const tags = VLC.initTags(data, formattedTitle);

        // Only change the title once
        if (title !== data.title) {
            title = VLC.formatTitle(data.title, settings);
            console.log(`${Status.PLAYING} ${title}`)

            fs.appendFileSync(EVENT_LOG, `${Status.PLAYING} ${title}\n`)
            fs.appendFile(PLAYED_FILE, `${title}\n`, (error) => {
                if (error) console.error(error.message);
                removeDuplicates();
            });
            title = data.title;
        }

        VLC.parseTags(tags, settings, (data) => fs.writeFileSync(MOVIE_FILE, data))

    } catch (error) {
        if (!VLC.IS_PLAYING) fs.writeFileSync(MOVIE_FILE, "Nothing is playing...")
        fs.appendFileSync(EVENT_LOG, `${error}\n`)
        console.error(error)
    }
}, 1000)

fs.watchFile(CONFIG_FILE, () => {
    Configuration.init();
    settings = Configuration.settings.config;
    console.log(Status.CONFIG_RELOADED, settings)
});

const removeDuplicates = () => {
    fs.readFile(PLAYED_FILE, 'utf-8', (err, data) => {
        if (err) console.error(err)
        const movie = data.split('\n');
        const uniqueMovies = [...new Set(movie)];
        fs.writeFile(PLAYED_FILE, uniqueMovies.join('\n'), () => { });
    });
}

const clearFile = (fileName) => {
    fs.writeFile(fileName, '', (err) => {
        console.error(err)
        return;
    })
}

// Clear the event log
clearFile(EVENT_LOG)