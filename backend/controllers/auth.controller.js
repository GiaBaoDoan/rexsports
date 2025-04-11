const { successResponse } = require("../utils/response.util");
const AuthServices = require("../services/auth.service");
const httpStatus = require("../constants/httpStatus");
const cookieOptions = require("../config/cookie.config");
const MESSAGE = require("../constants/messages");

const signup = async (req, res, next) => {
  try {
    const newUser = await AuthServices.signup(req.body);

    return res.status(httpStatus.CREATED).json({
      data: newUser,
      status: httpStatus.CREATED,
      message: MESSAGE.AUTH.REGISTER_SUCCESS,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { user, token } = await AuthServices.login(req.body);
    res.cookie("access_token", token, cookieOptions);
    return res.status(httpStatus.CREATED).json({
      data: user,
      status: httpStatus.CREATED,
      message: MESSAGE.AUTH.LOGIN_SUCCESS,
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await AuthServices.getMe(req.user.id);
    return res.status(httpStatus.OK).json({
      data: user,
      status: httpStatus.OK,
      message: MESSAGE.COMMON.SUCCESS,
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const updatedMe = await AuthServices.updateMe(req.user.id, req.body);
    return res.status(httpStatus.OK).json({
      data: updatedMe,
      status: httpStatus.OK,
      message: MESSAGE.COMMON.OK,
    });
  } catch (err) {
    next(err);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const newUser = await AuthServices.updatePassword(req.user.id, req.body);
    return successResponse(res, newUser, "Đã thay đổi password");
  } catch (err) {
    next(err);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const user = await AuthServices.verifyEmail(
      req.params.id,
      req.params.token
    );

    return res.status(httpStatus.OK).json({
      message: "Xác thực email thành công !!",
      data: user,
      status: httpStatus.OK,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");

    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: MESSAGE.AUTH.LOGOUT_SUCCESS,
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

const requestPasswordReset = async (req, res, next) => {
  try {
    const user = await AuthServices.requestPasswordReset(req.body.email);

    return res.status(httpStatus.OK).json({
      message: "Vui lòng kiểm tra email",
      data: user,
      status: httpStatus.OK,
    });
  } catch (err) {
    next(err);
  }
};

const resetNewPassword = async (req, res, next) => {
  const { userId, token } = req.params;

  try {
    const user = await AuthServices.resetNewPassword(
      userId,
      token,
      req.body.newPassword
    );

    return res.status(httpStatus.OK).json({
      message: "Mật khẩu đã được cập nhật !!",
      data: user,
      status: httpStatus.OK,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  signup,
  getMe,
  updateProfile,
  updatePassword,
  requestPasswordReset,
  resetNewPassword,
  verifyEmail,
  logout,
};
