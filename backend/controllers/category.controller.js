const httpStatus = require("../constants/httpStatus");
const CategoryServices = require("../services/category.service");
const { successResponse } = require("../utils/response.util");

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await CategoryServices.getAllCategories();
    return successResponse(res, categories);
  } catch (err) {
    next(err);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const category = await CategoryServices.getCategoryById(req.params.id);
    return successResponse(res, category);
  } catch (err) {
    next(err);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const category = await CategoryServices.createCategory(req.body);
    return successResponse(
      res,
      category,
      "Đã tạo danh mục",
      httpStatus.CREATED
    );
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const category = await CategoryServices.updateCategory(
      req.params.id,
      req.body
    );
    return successResponse(res, category, "Đã cập nhật danh mục");
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await CategoryServices.deleteCategory(req.params.id);
    return successResponse(res, category, "Đã xóa danh mục");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
  getCategoryById,
};
