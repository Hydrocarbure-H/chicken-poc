const { check_response } = require('../../../tools/other/functions');
const FUNCTIONS = require('../../../tools/other/functions');
const QUERY_CLASS = require('../../../tools/other/query-class');

const response_success = {
    data: {
        type: "Test", status: "Test", error: "Test", data: "Test",
    },
};

console.log("signal : " + JSON.stringify(response_success));

test('Test the functions file', () => {
    const string_response = JSON.stringify(response_success);
    const returned_value = FUNCTIONS.check_response(string_response);
    expect(returned_value.status).toBe("Test");
});