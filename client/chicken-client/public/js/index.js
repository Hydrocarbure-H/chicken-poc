/**
 * TO DO :
 * Debug reconnection after socket closed
 */

let socket = create_socket("login");
let connected = false;
var notification_message = "";

add_listeners();

/**
 * Check if the server has been disconnected without sending a disconnection request
 */
setInterval(function () {
    if (connected == false) {
        display_bar_message("Server disconnected");
    }
}, 5000);

/**
 * Open the connection with the server
 * @param {JSON} e 
 */
socket.onopen = function (e) {
    connected = true;
    display_bar_message("Connected");
};

/**
 * Will handle every request from the server
 * @param {JSON} e 
 */
socket.onmessage = function (e) {

    // Try to parse JSON data. If not, there is not any error which is displayed
    let response = check_response(e);

    if (check_status(response)) {
        switch (response.type) {
            // The response of the server after the login request
            case QueryType.Login:
                login_process(response.data);
                break;

            // The response of the server when we are disconnected
            case QueryType.Disconnect:
                internal_notification(DisplayNotification.Visible, "You have been disconnected");
                display_bar_message("Server disconnected");
                connected = false;
                break;

            default:
                break;
        }
    }
}
