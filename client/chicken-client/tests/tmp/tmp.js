const { check_response } = require('../../tools/other/functions');
const FUNCTIONS = require('../../tools/other/functions');

const e = {
    data: {
        type: "Test", status: "Test", error: "Test", data: "Test",
    },
};

console.log("signal : " + JSON.stringify(e.data));
json = JSON.parse(JSON.stringify(e.data));
console.log("JSON : " + json.type);

const string_response = JSON.stringify(response_success);
const returned_value = FUNCTIONS.check_response(string_response);

json = JSON.parse(JSON.stringify(e.data));
console.log("JSON : " + json.type);