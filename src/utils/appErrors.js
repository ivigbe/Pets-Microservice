const STATUS_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
}

class AppError extends Error {
    constructor(name, statusCode, description, errorStack, logingErrorResponse){
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        
        this.name = name;
        this.statusCode = statusCode;
        this.errorStack = errorStack;
        this.logError = logingErrorResponse;
        Error.captureStackTrace(this);
    }
}

//api Specific Errors
class APIError extends AppError {
    constructor(name, statusCode = STATUS_CODES.INTERNAL_ERROR, description ='Internal Server Error'){
        super(name, statusCode, description);
    }
}

//400
class BadRequestError extends AppError {
    constructor(description = 'Bad request', logingErrorResponse){
        super('NOT FOUND', STATUS_CODES.BAD_REQUEST, description, false, logingErrorResponse);
    }
}

//400
class ValidationError extends AppError {
    constructor(description = 'Validation Error', errorStack){
        super('BAD REQUEST', STATUS_CODES.BAD_REQUEST, description, errorStack);
    }
}


module.exports = {
    AppError,
    APIError,
    BadRequestError,
    ValidationError,
    STATUS_CODES,
}