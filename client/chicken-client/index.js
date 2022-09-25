// Electron app
const { app, BrowserWindow } = require('electron')
const path = require('path');

// Socket.io
const socket_app = require('express')();
const server = require('http').createServer(socket_app);
const io = require('socket.io')(server);

// Add files 
const INDEX = require('./tools/endpoints/index-backend.js');

// Setting up Electron App
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true
// If the above code have to be modified, must comment the previous line

// Create an Electron app
const createWindow = () => {
    const win = new BrowserWindow({
        icon: 'public/images/logo/icon-200-200.png',
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

// Create a socket.io server and wait for connection
io.on('connection', () => {
    console.log('A user is connected');
    // emit connected signal to the fucking client
    io.emit('connected');
});

// Create a ws connection with the main API
let socket = INDEX.create_socket("login");
console.log("Socket has been created");

socket.onopen = function (e) {
    console.log("Connected to the API !");
    io.emit('api_connected');
};

server.listen(3000);
