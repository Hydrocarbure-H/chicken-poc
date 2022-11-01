/**
 * TO DO :
 * Change notification style and structure (using classes)
 */
var connected = false;

// Create socket io connection to the electron app server
var socket = io('http://localhost:3000');
// emit connection signal
socket.emit('connection');

// Adding listeners on the login button
// FOR TESTING ONLY
// PUT THIS ACTION INTO THE API_CONNECTED SIGNAL FUNCTION JUST BELOW
add_listeners(socket);
// FOR TESTING ONLY

/**
 * @brief Listen for api connection success signal
 */
socket.on('api_connected', function () {
    // console.log("JS : Connected to the API !");
    // add_listeners(socket);
    connected = true;
    display_bar_message(ApiConnectionStatus.Connected);
});

/**
 * @brief Listen for client backend connection success signal
 */
socket.on('client_connected', function () {
    console.log("JS : Connected to the client backend !");
});

/**
 * @brief Redirect the user to the home page
 */
socket.on("login_redirection", function (data) {
    console.log("Redirecting to the home page");
    login_process(data);
});

/**
 * @brief Listen for disconnect signal
 */
socket.on('disconnect', function () {
    internal_notification(DisplayNotification.Visible, "You have been disconnected");
    display_bar_message(ApiConnectionStatus.Disconnected);
    connected = false;
});

/**
 * @brief Handle status error - TO IMPROVE
 */
socket.on("status error", function (data) {
    alert(data);
});

/**
 * @brief Handle response error - TO IMPROVE
 */
socket.on("response error", function (data) {
    alert(data);
});

/**
 * Check if the server has been disconnected without sending a disconnection request
 */
setInterval(function () {
    if (connected == false) {
        display_bar_message(ApiConnectionStatus.Timeout);
    }
}, 5000);
