/**
 * @author Thomas PEUGNET <thomas.peugnet.pro@gmail.com>
 * @file Description
 * @desc Created on 2022-12-11 3:58:23 pm
 * @copyright Thomas PEUGNET
 */
// Electron app
const { app, BrowserWindow } = require('electron')
const path = require('path');

const index_app = require('./index')
const home_app = require('./home')

// Global strings
const app_name = "Chicken";
const app_version = "0.0.1";

// Setting up Electron App
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = false
const platform = process.platform;

// TODO : Change the notification system in fontend to use only system notifications and alert messages
// Create an Electron app
const createWindow = () => {
    const win = new BrowserWindow({
        icon: 'public/images/logo/Chicken_logo.ico',
        titleBarStyle: 'hiddenInset',
        titleBarOverlay: true,
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        center: true,
        'minHeight': 600,
        'minWidth': 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    win.webContents.openDevTools()
    win.loadFile('public/views/index.html')
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
});

app.on('window-all-closed', () => {
    app.quit()
});

index_app.listen(3000, () => {
    console.log(`Socket io running in http://localhost:3000`);
});

home_app.listen(3001, () => {
    console.log(`API REST running in http://localhost:3001`);
});