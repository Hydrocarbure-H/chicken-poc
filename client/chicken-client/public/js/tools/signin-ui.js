/**
 * @author Thomas PEUGNET <thomas.peugnet.pro@gmail.com>
 * @file Description
 * @desc Created on 2022-12-11 4:14:00 pm
 * @copyright Thomas PEUGNET
 */
/**
 * @brief Will store the token from the server response in local storage 
 * and redirect the user to the main page
 * @param {JSON} login_data 
 */
function login_process(login_data) {
    // Success to authentificate
    var token = login_data.token;
    // Save token in local storage
    localStorage.setItem("token", token);
    // Redirect to home page
    window.location.href = "home.html";
}

/**
 * @brief Add listeners to submit and notification buttons
 */
function add_listeners(socket) {
    document.getElementById("submit_form").addEventListener("click", function () {
        send_data(socket) });
}

/**
 * @brief The login process.
 * It will send the username and the password hashed to the server.
 */
function send_data(socket) {
    // Check username and password
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    if (username === "" || password === "" || email === "") {
        display_message("Missing fields !", "failure");
    }
    else {

        // Prepare data
        const raw_data = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            email: document.getElementById("email").value
        };
        // hashed_password: (CryptoJS.SHA256(document.getElementById("password").value)).toString()
        // Send data
        socket.emit('signin_data', raw_data);
    }
}
