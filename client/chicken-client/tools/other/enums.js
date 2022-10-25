
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