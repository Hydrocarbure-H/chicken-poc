/**
 * @brief Display a message in the bar
 * @param {string} message 
 */
function top_bar_display(message) {
    console.log(message);
    var bar_message = document.getElementById("bar_message");
    bar_message.innerHTML = message;
}


/**
 * @brief Display message in the top bar
 * @param {DisplayError Enum} method 
 * @param {string} error 
 */
function display_message(message, type) {
    if (type === "error") {
        document.getElementById("bottom_bar_message").style.display = "block";
        document.getElementById("bottom_bar_message").innerHTML = message;
        document.getElementById("bottom_bar_message").style.backgroundColor = "var(--red1)";
    }
    else if (type === "success") {
        document.getElementById("bottom_bar_message").style.display = "block";
        document.getElementById("bottom_bar_message").innerHTML = message;
        document.getElementById("bottom_bar_message").style.backgroundColor = "var(--green1)";
    }
    else if (type === "warning") {
        document.getElementById("bottom_bar_message").style.display = "block";
        document.getElementById("bottom_bar_message").innerHTML = message;
        document.getElementById("bottom_bar_message").style.backgroundColor = "var(--orange1)";
    }


    // wait 7 seconds before hiding the message
    setTimeout(function () {
        document.getElementById("bottom_bar_message").style.display = "none";
    }, 7000);
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
        display_error(DisplayError.Visible, "Right click is disabled");
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

/**
 * @brief This function will scroll to the bottom of the div given
 * @param {div} div The div which will be scrolled
 */
function scrollToBottom(div) {
    div.scrollTop = div.scrollHeight;
}