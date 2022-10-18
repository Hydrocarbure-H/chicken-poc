
const ENUMS = require('./enums');

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
        return null
    }

    return new Response(json.type, json.status, json.error, json.data);
}

/**
 * @brief Check the status of the response
 * @param {JSON} response 
 * @returns 
 */
function check_status(response) {
    if (response.status === ENUMS.QueryStatus.failure) {
        // internal_notification(DisplayNotification.Visible, "Error : " + response.error);
        // manage_display_error(DisplayError.Visible, response.error);

        // Send a signal to client to display error message, status error
        return false
    }
    return true
}


// export functions
module.exports = {
    check_response: check_response,
    check_status: check_status
};