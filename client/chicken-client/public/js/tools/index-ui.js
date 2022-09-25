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
    document.getElementById("submit_form").addEventListener("click", function () { send_data(socket) });
    document.getElementById("submit_form").addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            send_data(socket);
        }
    });
    document.getElementById("bar_notif_icon").onclick = () => {
        internal_notification(DisplayNotification.Click, "");
    };
}

/**
 * @brief The login process.
 * It will send the username and the password hashed to the server.
 */
function send_data(socket) {
    // Check username and password
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username == "" || password == "") {
        manage_display_error(DisplayError.Visible, "Missing fields !");
        return;
    }
    else {
        // Clear error message
        manage_display_error(DisplayError.Hidden, "");
        // Prepare data
        var raw_data = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        };
        // hashed_password: (CryptoJS.SHA256(document.getElementById("password").value)).toString()
        // Send data
        socket.emit('login_data', raw_data);
    }
}

/**
 * @brief Display an error message on the login page
 * @param {DisplayError Enum} method 
 * @param {string} error 
 */
function manage_display_error(method, error) {
    if (method == DisplayError.Visible) {
        document.getElementById("bar_notif_icon").style.display = "block";
        document.getElementById("error_field").style.display = "block";
        document.getElementById("error_field").innerHTML = error;
        internal_notification(DisplayNotification.Visible, error);
    }
    else {
        document.getElementById("error_field").style.display = "none";
        internal_notification("hide", "");
    }
}