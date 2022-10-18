/**
 * Status : ENUMS : Failure / Error
 * Code : Error code number
 * Data : Error message object
 */

class Error {
    constructor(status, code, data) {
        this.status = status;
        this.code = code;
        this.data = data;
    }
}

/**
 * Title : Error title
 * Message : Error message
 */

class ErrorData {
    constructor(title, message) {
        this.title = title;
        this.message = message;
    }
}


// export classes
module.exports = {
    Error: Error,
    ErrorData: ErrorData
};

