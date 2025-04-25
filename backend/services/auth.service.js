const httpStatus = require("../constants/httpStatus");
const User = require("../models/User.model");
const Token = require("../models/Token.model");
const MESSAGE = require("../constants/messages");
const { createToken } = require("../utils/jwt.util");
const { hashPassword, comparePassword } = require("../utils/hash.util");
const CustomError = require("../utils/customError");
const sendEmail = require("../utils/email.util");

const TokenServices = require("../services/token.service");

const { CLIENT_URL } = require("../config/env.config");
const TYPE_EMAIL = require("../constants/typeEmail");
const generateEmailTemplate = require("../constants/html");
const roles = require("../constants/roles");

const signup = async (data) => {
  const user = await User.findOne({ email: data.email });

  if (user) {
    throw new CustomError(MESSAGE.AUTH.EMAIL_EXISTED, httpStatus.BAD_REQUEST);
  }

  data.password = await hashPassword(data.password);
  const newUser = await User.create(data);

  const token = await TokenServices.createHashToken(newUser._id);

  const link = `${CLIENT_URL}/auth/verify/${newUser._id}/${token}`;

  const html = generateEmailTemplate(TYPE_EMAIL.verify, link);
  await sendEmail(newUser.email, TYPE_EMAIL.verify, html);

  return newUser;
};

const login = async (data) => {
  const user = await User.findOne({
    email: data.email,
    verified: true,
    status: true,
  });

  if (!user) {
    throw new CustomError(MESSAGE.AUTH.LOGIN_FAILED, httpStatus.BAD_REQUEST);
  }

  const isMatch = await comparePassword(data.password, user.password);

  if (!isMatch) {
    throw new CustomError(MESSAGE.AUTH.LOGIN_FAILED, httpStatus.BAD_REQUEST);
  }

  const token = createToken(user);

  return { user, token };
};

const getMe = async (id) => {
  const user = await User.findById(id).select("-password");

  if (!user)
    throw new CustomError(MESSAGE.USER.NOT_FOUND, httpStatus.UNAUTHORIZED);

  return user;
};

const updateMe = async (id, data) => {
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { ...data },
    { new: true }
  ).select("-password");

  return updatedUser;
};

const updatePassword = async (userId, data) => {
  const user = await User.findById(userId);

  const isMatch = await comparePassword(data.currentPassword, user.password);

  if (!isMatch) {
    throw new CustomError("Mật khẩu cũ không đúng", httpStatus.BAD_REQUEST);
  }

  const hashedPassword = await hashPassword(data.newPassword);
  user.password = hashedPassword;

  await user.save();
  return user;
};

const verifyEmail = async (userId, tokenValue) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new CustomError(MESSAGE.AUTH.TOKEN_INVALID, httpStatus.BAD_REQUEST);
  }

  const token = await TokenServices.findToken(userId, tokenValue);
  const newUser = await User.findByIdAndUpdate(
    user._id,
    { verified: true },
    { new: true }
  );

  await Token.findByIdAndDelete(token._id);

  return newUser;
};

const requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError("Email chưa được đăng ký !!", httpStatus.BAD_REQUEST);
  }

  const token = await TokenServices.createHashToken(user._id);

  const link = `${CLIENT_URL}/auth/reset-password/${user._id}/${token}`;
  const html = generateEmailTemplate(TYPE_EMAIL.reset, link);
  await sendEmail(user.email, TYPE_EMAIL.reset, html);

  return user;
};

const resetNewPassword = async (userId, tokenValue, newPassword) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new CustomError(MESSAGE.AUTH.TOKEN_INVALID, httpStatus.BAD_REQUEST);
  }

  const token = await TokenServices.findToken(userId, tokenValue);
  user.password = await hashPassword(newPassword);

  await user.save();
  await Token.findByIdAndDelete(token._id);

  return user;
};

module.exports = {
  signup,
  login,
  getMe,
  updateMe,
  updatePassword,
  verifyEmail,
  requestPasswordReset,
  resetNewPassword,
};
