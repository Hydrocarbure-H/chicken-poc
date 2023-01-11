/**
 * @author Thomas PEUGNET <thomas.peugnet.pro@gmail.com>
 * @file Description
 * @desc Created on 2022-12-11 4:00:04 pm
 * @copyright Thomas PEUGNET
 */

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
    display_message(ApiConnectionStatus.Connected, "success");
});

socket.on("notification_sound", function () {
    const audio = new Audio("..\\assets\\sounds\\sound1.mp3");
    audio.play();
})

/**
 * @brief Listen for client backend connection success signal
 */
socket.on('client_connected', function () {
    console.log("JS : Connected to the client backend !");
});

/**
 * @brief Listen for disconnect signal
 */
socket.on('disconnect', function () {
    display_message("Disconnected from the API", "failure");
    connected = false;
});

/**
 * @brief Listen for the API connection failure signal
 */
socket.on('api_connection_failure', function (error) {
    console.log("JS : Connection to the API failed !");
    display_message("Disconected : " + JSON.stringify(error.errorType), "failure", 50);
    connected = false;
});

/**
 * @brief Listen for the API send login data failure
 */
socket.on('api_send_data_failure', function (error) {
    display_message(ApiConnectionStatus.SendLoginDataFailure + " : " + error, "failure");
});

/**
 * @brief Handle status error - TO IMPROVE
 */
socket.on("status error", function (data) {
    var test = JSON.parse(data);
    console.log("JS : Status error : " + JSON.stringify(test.data));
    display_message(ApiLoginResponse.Failure + " : " + JSON.parse(data), "failure", 50);
});

/**
 * @brief Handle response error - TO IMPROVE
 */
socket.on("response error", function (data) {
    alert(data);
});

