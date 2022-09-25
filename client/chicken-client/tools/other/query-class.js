class Query {
    constructor(type, status, error, data) {
        this.type = type;
        this.data = data;
    }
}

class Response {
    constructor(type, status, error, data) {
        this.type = type;
        this.status = status;
        this.error = error;
        this.data = data;
    }
}

// export classes
module.exports = {
    Query: Query,
    Response: Response
};

