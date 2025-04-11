const UserServices = require("../services/user.service");
const { successResponse } = require("../utils/response.util");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserServices.getAllUsers();
    return successResponse(res, users);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await UserServices.getUserById(req.params.id);
    return successResponse(res, user);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await UserServices.updateUser(req.params.id, req.body);
    return successResponse(res, user, "Đã cập nhật user");
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await UserServices.deleteUser(req.params.id);
    return successResponse(res, user, "Đã xóa user");
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
