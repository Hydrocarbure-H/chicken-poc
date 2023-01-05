/**
 * @author Thomas PEUGNET <thomas.peugnet.pro@gmail.com>
 * @file Description
 * @desc Created on 2022-12-11 3:58:23 pm
 * @copyright Thomas PEUGNET
 */
// Electron app
const { app, BrowserWindow } = require('electron')
const path = require('path');

// Socket.io
const socket_app = require('express')();
const server = require('http').createServer(socket_app);
const io = require('socket.io')(server);

// CryptoJS
const Crypto = require("crypto");

// Add files 
const INDEX = require('./tools/endpoints/index-backend.js');
const FUNCTIONS = require('./tools/other/functions.js');
const QUERY_CLASS = require('./tools/other/query-class.js');
const ERROR_CLASS = require('./tools/other/error-class.js');
const ENUMS = require('./tools/other/enums.js');
const { notify } = require('node-notifier');

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
    // win.webContents.openDevTools()

    win.loadFile('public/views/goat.html')
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
io.on('connection', (client_socket) => {
    // Inform the client that the connection has been established between the back and the front
    console.log("ELECTRON : Connected to the client frontend !");
    client_socket.emit('client_connected');

    // Create a ws connection with the main API
    let api_socket = INDEX.create_socket("login");

    // Connect to the main API, and emit the connection signal
    // If the connection is successful, emit the api_connected signal
    // Else, emit the api_connection_failure signal
    api_socket.start().then(function () {
        console.log("ELECTRON : Connected to the API !");
        client_socket.emit('api_connected');
    }).catch(function (err) {
        console.log("ELECTRON : Connection to the API failed !");
        client_socket.emit('api_connection_failure', err);
    });

    //**********************************************************************************************************************
    // Handle Client signals
    //**********************************************************************************************************************

    /**
     * Listen for the login request
     * @param {JSON} data Wich contains the user's credentials
     */
    client_socket.on('login_data', (data) => {
        console.log("ELECTRON : Login data received : " + data);
        var query = new QUERY_CLASS.Query(ENUMS.QueryType.Login, ENUMS.QueryStatus.Success, null, {
            username: data.username,
            hashed_password: Crypto.createHash('sha256').update(data.password).digest('base64')
        });


        // Send data
        console.log("query : " + JSON.stringify(query));

        api_socket.invoke("GetLoginData", JSON.stringify(query)).catch(function (err) {
            console.log("ELECTRON : Error while sending login data to the API : " + err);
            client_socket.emit('api_send_data_failure', err);
        });
    });

    //**********************************************************************************************************************
    // Handle API signals
    //**********************************************************************************************************************


    /**
     * Listen for the login response
     */
    api_socket.on("login", (data) => {
        console.log("ELECTRON : Received message from the API : " + data);
        let response = FUNCTIONS.get_response(data, client_socket);

        client_socket.emit('login_redirection', response.data);
    });

    /**
     * Listen for the signin response
     */
    api_socket.on(ENUMS.QueryType.Signin, function (data) {
        let response = get_response(data, client_socket);
        console.log("ELECTRON : Received message from the API : " + JSON.stringify(response));

        client_socket.emit('signin_redirection', response.data);
    });

    /**
     * Listen for the logout response
     */
    api_socket.on(ENUMS.QueryType.Disconnect, function (data) {
        let response = get_response(data);
        console.log("ELECTRON : Received message from the API : " + JSON.stringify(response));

        client_socket.emit('disconnect');
    });
});

server.listen(3000);