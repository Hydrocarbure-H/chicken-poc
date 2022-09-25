const { login_process } = require("../../tools/endpoints/index-backend");

/**
 * TO DO :
 * Change notification style and structure (using classes)
 */
var connected = false;

// Create socket io connection to the electron app server
var socket = io('http://localhost:3000');

// emit connection signal
socket.emit('connection');

// listen for connection signal

socket.on('api_connected', function () {
    console.log("Connected to the API !");
    connected = true;
    display_bar_message(ApiConnectionStatus.Connected);
    add_listeners();
});

/**
 * @brief Redirect the user to the home page
 */
socket.on("login_redirection", function (data) {
    login_process(data);
});


socket.on('disconnect', function () {
    internal_notification(DisplayNotification.Visible, "You have been disconnected");
    display_bar_message(ApiConnectionStatus.Disconnected);
    connected = false;
});

/**
 * Check if the server has been disconnected without sending a disconnection request
 */
setInterval(function () {
    if (connected == false) {
        display_bar_message(ApiConnectionStatus.Timeout);
    }
}, 5000);



// /**
//  * Will handle every request from the server
//  * @param {JSON} e 
//  */
// socket.onmessage = function (e) {

//     // Try to parse JSON data. If not, there is not any error which is displayed
//     let response = check_response(e);

//     if (check_status(response)) {
//         switch (response.type) {
//             // The response of the server after the login request
//             case QueryType.Login:
//                 login_process(response.data);
//                 break;

//             // The response of the server when we are disconnected
//             case QueryType.Disconnect:
//                 internal_notification(DisplayNotification.Visible, "You have been disconnected");
//                 display_bar_message("Server disconnected");
//                 connected = false;
//                 break;

//             default:
//                 break;
//         }
//     }
// }
