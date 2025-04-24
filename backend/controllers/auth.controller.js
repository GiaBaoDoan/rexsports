const AuthServices = require("../services/auth.service");
const httpStatus = require("../constants/httpStatus");
const { NODE_ENV } = require("../config/env.config");

const signup = async (req, res, next) => {
  try {
    const newUser = await AuthServices.signup(req.body);

    return res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: "Đăng ký thành công",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { user, token } = await AuthServices.login(req.body);

    res.cookie("access_token", token, {
      path: "/",
      secure: NODE_ENV === "production",
      sameSite: NODE_ENV === "production" ? "none" : "lax",
      expires: new Date(Date.now() + 120 * 60 * 1000),
      httpOnly: true,
    });

    return res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: "Đăng nhập thành công !!",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await AuthServices.getMe(req.user.id);
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Lấy thông tin thành công !!",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const updatedMe = await AuthServices.updateMe(req.user.id, req.body);
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Cập nhật thông tin thành công !!",
      data: updatedMe,
    });
  } catch (err) {
    next(err);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const newUser = await AuthServices.updatePassword(req.user.id, req.body);

    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Cập nhật mật khẩu thành công !!",
      data: newUser,
    });
  } catch (err) {
    console.log(err);
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
      status: httpStatus.OK,
      message: "Xác thực email thành công !!",
      data: user,
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
      message: "Đăng xuất thành công !!",
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
      status: httpStatus.OK,
      message: "Vui lòng kiểm tra email !!",
      data: user,
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
      message: "Thay đổi mậu khẩu thành công !!",
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
