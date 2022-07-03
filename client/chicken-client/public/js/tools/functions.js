/**
 * @brief Check the validity of the response
 * @param {JSON} e 
 * @returns 
 */
function check_response(e) {
    try {
        json = JSON.parse(e.data);
    }
    catch (e) {
        internal_notification(DisplayNotification.Visible, "JSON PARSE - DEBUG : " + response.error);
        alert("Error : The server sent an invalid response");
    }

    return new Response(json.type, json.status, json.error, json.data);
}

/**
 * @brief Check the status of the response
 * @param {JSON} response 
 * @returns 
 */
function check_status(response) {
    if (response.status === QueryStatus.Failure) {
        internal_notification(DisplayNotification.Visible, "Error : " + response.error);
        manage_display_error(DisplayError.Visible, response.error);
        return false
    }
    return true
}

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



/**
 * > The function `handle_right_click()` adds an event listener to the document
 * that listens for a right click event. When the event is triggered, the default
 * action is prevented and an alert is displayed
 */
function handle_right_click() {
    document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        console.log(e);
        alert("Right click test");
    }
        , false);
}

/**
 * @brief Will enable horizontal scroll for a div with a vertical scroll
 */
function enable_horizontal_scroll(div_to_scroll) {
    const scrollContainer = document.querySelector("." + div_to_scroll);
    scrollContainer.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        scrollContainer.scrollLeft += evt.deltaY;
    });
}