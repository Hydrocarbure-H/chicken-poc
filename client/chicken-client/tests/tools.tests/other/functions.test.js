const FUNCTIONS = require('../../../tools/other/functions');
const QUERY_CLASS = require('../../../tools/other/query-class');
const ERROR_CLASS = require('../../../tools/other/error-class');
const ENUMS = require('../../../tools/other/enums');

const bad_response_format = {
    data: {
    },
};

const good_response_format = {
    data: {
        type: "Test", status: "Test", error: "Test", data: "Test",
    },
};

/**
 * Info : Valid JSON could'nt be tested, for unknown reason. 
 * Reproducing check_response function behaviour has not changed anything.
 */


test('Testing a wrong response format', () => {
    const string_response = JSON.stringify(bad_response_format);
    const returned_value = FUNCTIONS.check_response(string_response);
    expect(returned_value).toBeInstanceOf(ERROR_CLASS.Error);
});

test('Testing check_status function : SUCCESS',
    () => {
        const response = new QUERY_CLASS.Response("login", ENUMS.QueryStatus.success, null, "{login:{}}");
        var result = FUNCTIONS.check_status(response);
        expect(result).toBe(true);
    });

test('Testing check_status function : FAILURE',
    () => {
        const response = new QUERY_CLASS.Response("login", ENUMS.QueryStatus.failure, null, "{login:{}}");
        var result = FUNCTIONS.check_status(response);
        expect(result.code).toBe(1)
    });

test('Testing check_status function : UNKNOWN',
    () => {
        const response = new QUERY_CLASS.Response("login", "jhfbasdjfbaskhfb", null, "{login:{}}");
        var result = FUNCTIONS.check_status(response);
        expect(result).toBeInstanceOf(ERROR_CLASS.Error);
        expect(result.code).toBe(1);
    });