class HttpError {
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }
}

class MissingMandatoryParameterError400 extends HttpError {
    constructor(args) {
        super(args);
        this.status = 400;
        this.message = message || `missing mandatory parameter [${param}]`;
    }
}

class MissingFieldError409 extends HttpError {
    constructor(message) {
        super(message);
        this.status = 409;
        this.message = message || `object missing field`;
    }
}

class ObjectNotFoundError409 extends HttpError {
    constructor(obj, message) {
        super(message);
        this.status = 409;
        this.message = message || `object [${obj}] not found`;
    }
}

module.exports = {
    MissingMandatoryParameterError400,
    MissingFieldError409,
    ObjectNotFoundError409
}