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