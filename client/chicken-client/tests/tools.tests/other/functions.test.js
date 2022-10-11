const { check_response } = require('../../../tools/other/functions');
const FUNCTIONS = require('../../../tools/other/functions');
const QUERY_CLASS = require('../../../tools/other/query-class');


const response_success = "{data:'{}'}";

test('Test the functions file', () => {
    expect(check_response(response_success)).toBeInstanceOf(QUERY_CLASS.Response)
});