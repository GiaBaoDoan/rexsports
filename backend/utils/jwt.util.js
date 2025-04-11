const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env.config");
const CustomError = require("./customError");
const httpStatus = require("../constants/httpStatus");

const createToken = (user) => {
  const payload = {
    id: user._id,
    role: user.role,
  };

  const secretKey = JWT_SECRET;

  const options = {
    expiresIn: "1h",
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};

const decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new CustomError("Token không hợp lệ", httpStatus.UNAUTHORIZED);
  }
};
module.exports = { createToken, decodeToken };
