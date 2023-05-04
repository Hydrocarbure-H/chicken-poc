/**
 * @author Thomas PEUGNET <thomas.peugnet.pro@gmail.com>
 * @file Description
 * @desc Created on 2022-12-11 4:49:11 pm
 * @copyright Thomas PEUGNET
 */

const ENUMS = require('./enums');
const ERROR_CLASS = require('./error-class');
const QUERY_CLASS = require('./query-class');
const { Notification } = require('electron');


/**
 * @brief Check the validity of the response
 * @param {JSON} e 
 * @returns 
 */
function check_response(e) {

    try {
        json = JSON.parse(e);
    }
    catch (e) {
        console.log("ELECTRON : Parsing error")
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


function get_response(e, client_socket) {
    let response = check_response(e);
    if (typeof response == ERROR_CLASS.Error) {
        console.log("ELECTRON : Response error");
        const error_data = new ERROR_CLASS.ErrorData(ENUMS.ErrorCode.response_error + " : Response error", "Unexpected JSON parsing error. Response : " + JSON.stringify(e));
        const error_object = new ERROR_CLASS.Error(ENUMS.QueryStatus.error, ENUMS.ErrorCode.response_error, error_data);
        client_socket.emit("response error", JSON.stringify(error_object));
        return;
    }
    if (check_status(response) != true) {
        console.log("ELECTRON : Status error");
        const error_data = new ERROR_CLASS.ErrorData(ENUMS.ErrorCode.status_error + " : Status error", "Unexpected status error. Response : " + JSON.stringify(response));
        const error_object = new ERROR_CLASS.Error(ENUMS.QueryStatus.error, ENUMS.ErrorCode.status_error, error_data);
        client_socket.emit("status error", JSON.stringify(error_object));
        return;
    }
    return response;
}


function notify(platform, title, body, socket) {

    if (platform === "win32") {
        const options = {
            title: 'System',
            body: 'Connected to backend.',
            icon: 'public/images/logo/Chicken_logo.png',
            silent: true,
            hasReply: true,
            timeoutType: 'never',
            urgency: 'critical',
            closeButtonText: 'Close',
            actions: [{
                type: 'button',
                text: 'Show Button'
            }]
        };
        const customNotification = new Notification(options);
        customNotification.show();
        socket.emit("notification_sound");

    }
    else if (platform === "darwin") {
        new Notification({ title: title, body: body, sound: "sound2" }).show();
    }
}

// export functions
module.exports = {
    check_response: check_response,
    check_status: check_status,
    notify: notify,
    get_response: get_response,
};