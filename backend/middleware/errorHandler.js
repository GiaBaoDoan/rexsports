const httpStatus = require("../constants/httpStatus");

const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || httpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server";

  return res.status(statusCode).json({
    statusCode,
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
