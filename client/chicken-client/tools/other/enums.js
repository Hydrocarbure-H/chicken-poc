/**
 * @author Thomas PEUGNET <thomas.peugnet.pro@gmail.com>
 * @file Description
 * @desc Created on 2022-12-11 4:09:41 pm
 * @copyright Thomas PEUGNET
 */

const QueryType = {
    Login: 'login',
    Signin: 'signin',
    Disconnect: 'disconnect',
    SendMessage: 'send_message',
    GetMessages: 'get_messages',
    GetUsers: 'get_users'

};

const QueryStatus = {
    success: 'success',
    error: 'error',
    failure: 'failure'
};

const ErrorCode = {
    status_error: 1,
    response_error: 2,
    connection_error: 3
}

// export enums
module.exports = {
    QueryType: QueryType,
    QueryStatus: QueryStatus,
    ErrorCode: ErrorCode
};