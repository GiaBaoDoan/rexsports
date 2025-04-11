const UserServices = require("../services/user.service");
const { successResponse } = require("../utils/response.util");

const MESSAGE = require("../constants/messages");
const httpStatus = require("../constants/httpStatus");

const getAllUsers = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const { users, pagination } = await UserServices.getAllUsers({
      page,
      limit,
    });

    return res.status(httpStatus.OK).json({
      data: users,
      message: MESSAGE.USER.FETCHED_ALL,
      status: httpStatus.OK,
      pagination,
    });
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await UserServices.getUserById(req.params.id);
    return res.status(httpStatus.OK).json({
      data: user,
      message: MESSAGE.USER.FETCHED,
      status: httpStatus.OK,
    });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await UserServices.updateUser(req.params.id, req.body);
    return res.status(httpStatus.OK).json({
      data: user,
      message: MESSAGE.USER.UPDATED,
      status: httpStatus.OK,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await UserServices.deleteUser(req.params.id);
    return res.status(httpStatus.OK).json({
      data: user,
      message: MESSAGE.USER.DELETED,
      status: httpStatus.OK,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
