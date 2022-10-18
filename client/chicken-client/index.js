// Electron app
const { app, BrowserWindow } = require('electron')
const path = require('path');

// Socket.io
const socket_app = require('express')();
const server = require('http').createServer(socket_app);
const io = require('socket.io')(server);

// Add files 
const INDEX = require('./tools/endpoints/index-backend.js');
const FUNCTIONS = require('./tools/other/functions.js');
const QUERY_CLASS = require('./tools/other/query-class.js');
const ENUMS = require('./tools/other/enums.js');

// Setting up Electron App
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = false
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

    win.loadFile('public/views/home.html')
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

    // Create a ws connection with the main API
    let api_socket = INDEX.create_socket("login");

    // Inform the client that the connection has been established between the back and the front
    console.log("ELECTRON : Connected to the client frontend !");
    client_socket.emit('client_connected');

    /**
     * Listen for the login request
     * @param {JSON} data Wich contains the user's credentials
     */
    client_socket.on('login_data', (data) => {
        console.log("ELECTRON : Login data received : " + data);
        var query = new QUERY_CLASS.Query(ENUMS.QueryType.Login, ENUMS.QueryStatus.Success, null, {
            username: data.username,
            password: data.password
        });
        // hashed_password: (CryptoJS.SHA256(document.getElementById("password").value)).toString()
        // Send data
        console.log("query : " + JSON.stringify(query));
        // api_socket.send(JSON.stringify(query));
    });

    /**
     * Open the connection with the server
     * @param {JSON} e 
     */
    api_socket.onopen = function (e) {
        console.log("ELECTRON : Connected to the API !");
        client_socket.emit('api_connected');
    };

    /**
     * Will handle every request from the API
     * @param {JSON} e 
     */
    api_socket.onmessage = function (e) {

        // Try to parse JSON data. If not, there is not any error which is displayed
        let response = FUNCTIONS.check_response(e);

        if (FUNCTIONS.check_status(response)) {
            switch (response.type) {
                // The response of the server after the login request
                case QueryType.Login:
                    // Emit login_redirection signal to the fucking client
                    client_socket.emit('login_redirection', response.data);
                    break;

                // The response of the server when we are disconnected
                case QueryType.Disconnect:
                    // Emit disconnect signal to the fucking client
                    client_socket.emit('disconnect');
                    break;

                default:
                    break;
            }
        }
    }
});

server.listen(3000);
