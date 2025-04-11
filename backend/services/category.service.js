const httpStatus = require("../constants/httpStatus");
const Category = require("../models/Category.model");
const CustomError = require("../utils/customError");

const getAllCategories = async () => {
  const categories = await Category.find().select("-__v");

  return categories;
};

const getCategoryById = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new CustomError("Không tìm thấy danh mục", httpStatus.NOT_FOUND);
  }

  return category;
};

const createCategory = async (data) => {
  const existingSlug = await Category.findOne({ slug: data.slug });

  if (existingSlug) {
    throw new CustomError(
      `Slug "${data.slug}" đã được sử dụng`,
      httpStatus.BAD_REQUEST
    );
  }

  const category = await Category.create(data);

  return category;
};

const updateCategory = async (id, data) => {
  await getCategoryById(id);

  const existingSlug = await Category.findOne({
    slug: data.slug,
    _id: { $ne: id },
  });

  if (existingSlug) {
    throw new CustomError(
      `Slug "${slug}" đã được sử dụng`,
      httpStatus.BAD_REQUEST
    );
  }

  const updateData = await Category.findByIdAndUpdate(id, data, {
    new: true,
  });

  return updateData;
};

const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);

  if (!category)
    throw new CustomError("Không tìm thấy danh mục", httpStatus.NOT_FOUND);

  await category;
};

module.exports = {
  getCategoryById,
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
};
