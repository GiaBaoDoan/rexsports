const httpStatus = require("../constants/httpStatus");
const User = require("../models/User.model");
const CustomError = require("../utils/customError");
const getPagination = require("../utils/pagination.util");

const getAllUsers = async ({ page, limit }) => {
  const totalRecords = await User.countDocuments();

  const { skip, currentPage, totalPages } = getPagination(
    totalRecords,
    parseInt(page),
    parseInt(limit)
  );
  const users = await User.find()
    .sort({ createAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  return {
    users,
    pagination: { totalRecords, totalPages, currentPage, limit },
  };
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
