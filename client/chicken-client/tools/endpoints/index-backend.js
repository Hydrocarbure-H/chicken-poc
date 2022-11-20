// Websocket
const signalR = require("@microsoft/signalr");
const ERROR_CLASS = require('../other/error-class.js');
const ENUMS = require('../other/enums.js');

/**
 * @brief Create a new socket
 * @param {string} endpoint 
 * @returns {WebSocket} The new socket
 * TODO : Add a timeout handler
 */
function create_socket(endpoint) {
    return new signalR.HubConnectionBuilder().withUrl("http://192.168.1.182:8080/" + endpoint).build();
}



// export functions
module.exports = {
    create_socket: create_socket,
};