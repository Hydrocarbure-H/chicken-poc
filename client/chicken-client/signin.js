/**
 * @author Thomas PEUGNET <thomas.peugnet.pro@gmail.com>
 * @file Description
 * @desc Created on 2022-12-11 3:58:23 pm
 * @copyright Thomas PEUGNET
 */
// Add files 
const INDEX = require('./tools/endpoints/index-backend.js');
const FUNCTIONS = require('./tools/other/functions.js');
const QUERY_CLASS = require('./tools/other/query-class.js');
const ERROR_CLASS = require('./tools/other/error-class.js');
const ENUMS = require('./tools/other/enums.js');

// Socket.io
const socket_app = require('express')();
const server = require('http').createServer(socket_app);
const io = require('socket.io')(server);
const Crypto = require('crypto');


// Create a socket.io server and wait for connection
io.on('connection', (client_socket) => {
    // Inform the client that the connection has been established between the back and the front
    console.log("ELECTRON : Connected to the client frontend !");
    client_socket.emit('client_connected');

    // Create a ws connection with the main API
    let api_socket = INDEX.create_socket("Account");

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
    client_socket.on('signin_data', (data) => {
        var query = new QUERY_CLASS.Query(ENUMS.QueryType.Signin, ENUMS.QueryStatus.Success, null, {
            username: data.username,
            hashed_password: Crypto.createHash('sha256').update(data.password).digest('base64'),
            name: data.name,
        });


        // Send data to the server
        api_socket.invoke("Login", JSON.stringify(query)).catch(function (err) {
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
        // close connections
        api_socket.close();
        client_socket.disconnect();
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

module.exports = server;