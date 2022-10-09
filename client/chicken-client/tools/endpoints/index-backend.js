// Websocket
const WebSocket = require('ws');

/**
 * @brief Create a new socket
 * @param {string} endpoint 
 * @returns {WebSocket} The new socket
 * TODO : Add a timeout handler
 */
function create_socket(endpoint) {
    return new WebSocket("ws://192.168.1.182:9002/" + endpoint);
}


// export functions
module.exports = {
    create_socket: create_socket,
};