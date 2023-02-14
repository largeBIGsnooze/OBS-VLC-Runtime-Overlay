
const { BrowserWindow } = require('electron');

let windowCount = 0

module.exports = () => {
    if (windowCount >= 1) return
    let win = new BrowserWindow({
        width: 650,
        height: 850,
        autoHideMenuBar: true,
        resizable: false,
    });
    win.loadFile('./src/frontend/index.html');
    windowCount++;

    win.on('close', () => windowCount--)
    win.once('ready-to-show', () => win.show());
}