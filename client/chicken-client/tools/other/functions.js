
const ENUMS = require('./enums');
const ERROR_CLASS = require('./error-class');
const QUERY_CLASS = require('./query-class');
const { Notification } = require('electron');

// Notification
const notifier = require('node-notifier');

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
        // internal_notification(DisplayNotification.Visible, "JSON PARSE - DEBUG : " + response.error);
        // alert("Error : The server sent an invalid response");

        // Send a signal to client to display error message

        const error_data = new ERROR_CLASS.ErrorData(ENUMS.ErrorCode.response_error + " : Response error", "Unexpected JSON parsing error. Response : " + JSON.stringify(e));
        return new ERROR_CLASS.Error(ENUMS.QueryStatus.error, ENUMS.ErrorCode.response_error, error_data);
    }

    return new QUERY_CLASS.Response(json.type, json.status, json.error, json.data);
}

/**
 * @brief Check the status of the response
 * @param {JSON} response 
 * @returns 
 */
function check_status(response) {
    if (response.status === ENUMS.QueryStatus.success) {
        return true
    }
    else {
        const error_data = new ERROR_CLASS.ErrorData(ENUMS.ErrorCode.status_error + " : Status error", "Unexpected status error : status = " + response.status);
        return new ERROR_CLASS.Error(response.status, ENUMS.ErrorCode.status_error, error_data);
    }
}

function notify(platform, title, body) {

    if (platform === "win32") {
        const options = {
            title: 'Chicken',
            message: 'Connected to backend.',
            icon: 'public/images/logo/Chicken_logo.png',
            sound: "public/assets/sounds/chicken_one_2sounds.mp3"
        };
        notifier.notify(options);
    }
    else if (platform === "darwin") {
        console.log("NOTIFY : " + platform + " - " + title + " - " + body);
        new Notification({ title: title, body: body }).show();
    }
}

// export functions
module.exports = {
    check_response: check_response,
    check_status: check_status,
    notify: notify
};