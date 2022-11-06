// Websocket
const WebSocket = require('ws');
const ERROR_CLASS = require('../other/error-class.js');
const ENUMS = require('../other/enums.js');

/**
 * @brief Create a new socket
 * @param {string} endpoint 
 * @returns {WebSocket} The new socket
 * TODO : Add a timeout handler
 */
function create_socket(endpoint) {
    const socket = new WebSocket("ws://chicken.coloc:9002/" + endpoint);
    // socket.addEventListener('error', (event) => {
    //     console.log("Error : " + event);
    //     const error_data = new ERROR_CLASS.ErrorData(ENUMS.ErrorCode.response_error + " : Response error", "Unexpected JSON parsing error. Response : " + JSON.stringify(event));
    //     const error_object = new ERROR_CLASS.Error(ENUMS.QueryStatus.error, ENUMS.ErrorCode.response_error, error_data);
    //     client_socket.emit("response error", JSON.stringify(error_object));
    //     return;
    // });
    return socket;
}


// export functions
module.exports = {
    create_socket: create_socket,
};