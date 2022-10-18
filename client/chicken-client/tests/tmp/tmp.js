// const { check_response } = require('../../tools/other/functions');
const { json } = require('express');
const FUNCTIONS = require('../../tools/other/functions');

const response_success = {
    data: {
        type: "Test", status: "Test", error: "Test", data: "Test",
    },
};

str_json_man = JSON.stringify(response_success)
json_man = JSON.parse(str_json_man);
console.log("Ext to function : " + json_man.data.type)

str_json_func = JSON.stringify(response_success);
json_func = check_response(str_json_func);
console.log("Int to function : " + json_func.data.type)


function check_response(e) {
    try {
        json = JSON.parse(e);
    }
    catch (e) {
        // internal_notification(DisplayNotification.Visible, "JSON PARSE - DEBUG : " + response.error);
        // alert("Error : The server sent an invalid response");
        // Send a signal to client to display error message
        return null
    }

    return new Response(json.type, json.status, json.error, json.data);
}