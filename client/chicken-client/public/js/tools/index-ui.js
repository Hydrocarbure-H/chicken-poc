/**
 * @brief Add listeners to submit and notification buttons
 */
function add_listeners() {
    document.getElementById("submit_form").addEventListener("click", send_data);
    document.getElementById("submit_form").addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            send_data();
        }
    });
    document.getElementById("bar_notif_icon").onclick = () => {
        internal_notification(DisplayNotification.Click, "");
    };
}

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