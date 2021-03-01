const AppError = require("./../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const sendErrorDev = (res, err) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (res, err) => {
  // Operational, trusted error: Send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    //Programming or other unknown error: dont leak error details.
  } else {
    // 1) Log error
    console.log("Error 😒", err);
    // 2) Send generic message
    res.status(err.statusCode).json({
      status: "Error",
      message: "Something went wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(res, err);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.name = err.name;
    if (error.name === "CastError") {
      error = handleCastErrorDB(error);
    }
    sendErrorProd(res, error);
  }
};
