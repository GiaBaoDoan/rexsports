const CustomError = require("../utils/customError");
const { decodeToken } = require("../utils/jwt.util");
const httpStatus = require("../constants/httpStatus");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(new CustomError("Token không hợp lệ", httpStatus.UNAUTHORIZED));
  }

  try {
    const decoded = decodeToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyToken;
