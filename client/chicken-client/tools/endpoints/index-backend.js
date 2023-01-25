/**
 * @author Thomas PEUGNET <thomas.peugnet.pro@gmail.com>
 * @file Description
 * @desc Created on 2022-12-11 4:04:55 pm
 * @copyright Thomas PEUGNET
 */
// Websocket
const signalR = require("@microsoft/signalr");
const ERROR_CLASS = require('../other/error-class.js');
const ENUMS = require('../other/enums.js');

/**
 * @brief Create a new socket
 * @param {string} endpoint 
 * @returns {Socket} The new socket
 * TODO : Add a timeout handler
 */
function create_socket(endpoint) {
    return new signalR.HubConnectionBuilder().withUrl("http://192.168.1.182:9002/" + endpoint).build();
}



// export functions
module.exports = {
    create_socket: create_socket,
};