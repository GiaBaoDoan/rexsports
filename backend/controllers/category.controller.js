const httpStatus = require("../constants/httpStatus");
const CategoryServices = require("../services/category.service");

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await CategoryServices.getAllCategories();
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Lấy dữ liệu thành công",
      data: categories,
    });
  } catch (err) {
    next(err);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const category = await CategoryServices.getCategoryById(req.params.id);
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Lấy dữ liệu thành công",
      data: category,
    });
  } catch (err) {
    next(err);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const category = await CategoryServices.createCategory(req.body);
    return res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: "Tạo danh mục thành công !!",
      data: category,
    });
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
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Đã cập nhật danh mục !!",
      data: category,
    });
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await CategoryServices.deleteCategory(req.params.id);
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Đã xóa danh mục thành công !!",
      data: category,
    });
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
