/**
 * @author Thomas PEUGNET <thomas.peugnet.pro@gmail.com>
 * @file Description
 * @desc Created on 2022-12-11 3:58:23 pm
 * @copyright Thomas PEUGNET
 */
// Electron app
const path = require('path');

// Socket.io
const socket_app = require('express')();
const server = require('http').createServer(socket_app);
const io = require('socket.io')(server);

// Add files 
const HOME = require('./tools/endpoints/home-backend.js');
const FUNCTIONS = require('./tools/other/functions.js');
const QUERY_CLASS = require('./tools/other/query-class.js');
const ERROR_CLASS = require('./tools/other/error-class.js');
const ENUMS = require('./tools/other/enums.js');
const { notify } = require('node-notifier');

// Create a socket.io server and wait for connection
io.on('connection', (client_socket) => {
    // Inform the client that the connection has been established between the back and the front
    console.log("ELECTRON : Connected to the client frontend !");
    client_socket.emit('client_connected');

    // Create a ws connection with the main API
    let api_socket = HOME.create_socket("Messages");

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
    client_socket.on('send_message', (data) => {
        var query = new QUERY_CLASS.Query(ENUMS.QueryType.SendMessage, ENUMS.QueryStatus.Success, null, {
            transmitter: data.transmitter_token,
            recipient: data.recipient_token,
            content: data.content,
            date: new Date()
        });

        // Send data to the server
        api_socket.invoke("Send", JSON.stringify(query)).catch(function (err) {
            console.log("ELECTRON : Error while sending login data to the API : " + err);
            client_socket.emit('api_send_data_failure', err);
        });
    });

    /**
     * Listen for the get_messages request
     */
    client_socket.on('get_messages', (data) => {
        console.log("ELECTRON : Received get_messages request from the client !");
        var query = new QUERY_CLASS.Query(ENUMS.QueryType.GetMessages, ENUMS.QueryStatus.Success, null, {
            user: data
        });

        console.log("ELECTRON : Query : " + JSON.stringify(query));

        // Send data to the server
        api_socket.invoke("Get", JSON.stringify(query)).catch(function (err) {
            console.log("ELECTRON : Error while sending login data to the API : " + err);
            client_socket.emit('api_send_data_failure', err);
        });
    });

    //**********************************************************************************************************************
    // Handle API signals
    //**********************************************************************************************************************


    /**
     * Listen for ok signal from the API after send message
     */
    api_socket.on("send", (data) => {
        console.log("ELECTRON : Received message from the API : " + data);
        let response = FUNCTIONS.get_response(data, client_socket);

        client_socket.emit('login_redirection', response.data);
    });

    /**
     * Listen for messages from the server
     */
    api_socket.on("get", (data) => {
        console.log("ELECTRON : Received message from the API : " + data);
        let response = FUNCTIONS.get_response(data, client_socket);

        client_socket.emit('pull_messages', response.data);
    });


});

module.exports = server;