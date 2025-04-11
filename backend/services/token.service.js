const TokenModel = require("../models/Token.model");
const crypto = require("crypto");
const CustomError = require("../utils/customError");
const httpStatus = require("../constants/httpStatus");
const MESSAGE = require("../constants/messages");

const createHashToken = async (userId) => {
  const newToken = await new TokenModel({
    userId,
    token: crypto.randomBytes(32).toString("hex"),
  }).save();

  return newToken.token;
};

const findToken = async (userId, tokenValue) => {
  const token = await TokenModel.findOne({
    userId,
    token: tokenValue,
  });

  if (!token) {
    throw new CustomError(MESSAGE.AUTH.TOKEN_INVALID, httpStatus.BAD_REQUEST);
  }

  return token;
};

module.exports = {
  createHashToken,
  findToken,
};
