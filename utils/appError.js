//custom error handlergit
class AppError extends Error {
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
        this.status =`${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true; //all the error get prop set to true, so we can tell the errors apart from programming errors.
        Error.captureStackTrace(this,this.constructor);
    }
}

module.exports = AppError;