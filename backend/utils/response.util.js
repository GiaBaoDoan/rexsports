const httpStatus = require("../constants/httpStatus");

const successResponse = (
  res,
  data,
  pagination = null,
  message = "Lấy dữ liệu thành công",
  statusCode = httpStatus.OK
) => {
  return res.status(statusCode).json({
    status: statusCode,
    message,
    data,
    ...(pagination ? { pagination } : {}),
  });
};

module.exports = { successResponse };
