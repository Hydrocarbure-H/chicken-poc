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

// function send_data(socket) {

//     var query = new Query(QueryType.Login, QueryStatus.Success, null, {
//         username: document.getElementById("username").value,
//         password: document.getElementById("password").value
//     });
//     // hashed_password: (CryptoJS.SHA256(document.getElementById("password").value)).toString()
//     // Send data
//     socket.send(JSON.stringify(query));

// }

// export functions
module.exports = {
    create_socket: create_socket,
};