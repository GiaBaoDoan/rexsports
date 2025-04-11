const httpStatus = require("../constants/httpStatus");
const User = require("../models/User.model");
const CustomError = require("../utils/customError");

const getAllUsers = async () => {
  const users = await User.find().select("-password");
  return users;
};

const getUserById = async (id) => {
  const user = await User.findById(id).select("-password");
  if (!user) {
    throw new CustomError("Không tìm thấy user", httpStatus.NOT_FOUND);
  }

  return user;
};

const updateUser = async (id, data) => {
  await getUserById(id);

  const newUser = await User.findByIdAndUpdate(id, data, {
    new: true,
  });

  return newUser;
};

const deleteUser = async (id) => {
  await getUserById(id);

  const user = await User.findByIdAndDelete(id);

  return user;
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
