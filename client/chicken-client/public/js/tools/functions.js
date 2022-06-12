/**
 * @param {string} title
 * @param {string} message
 * @brief Display a notification
 */
function external_notification(title, body) {

    let notification = new Notification(title, { body });
    notification.onclick = () => {
        notification.close();
        window.parent.focus();
    }
}

/**
 * @brief Display a message in the bar
 * @param {string} message 
 */
function display_bar_message(message) {
    var bar_message = document.getElementById("bar_message");
    bar_message.innerHTML = message;
}

/**
 * @brief test function
 */
function my_test(number) {
    return number;
}

/**
 * @brief Management of the display of the notification
 * @param {DisplayNotification Enum} method 
 * @param {string} message 
 */
function internal_notification(method, message) {
    if (method === DisplayNotification.Click) {
        alert(notification_message);
        internal_notification(DisplayNotification.Hidden);
    }
    else if (method === DisplayNotification.Visible) {
        notification_message = message;
        document.getElementById("bar_notif_icon").style.display = "block";
    }
    else if (method === DisplayNotification.Hidden) {
        notification_message = "";
        document.getElementById("bar_notif_icon").style.display = "none";
    }
}


if (typeof window === 'undefined') {
    module.exports = {
        my_test,
        external_notification,
        display_bar_message,
        internal_notification
    };
}

