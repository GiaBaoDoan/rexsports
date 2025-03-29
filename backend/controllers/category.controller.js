const Category = require("../models/Category.model");
const CustomError = require("../utils/customError");

const fetchCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();

    return res.status(200).json({
      data: categories,
      status: 200,
      message: "Lấy dữ liệu thành công",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const fetchCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);

    if (!category) return next(new CustomError("Không tìm thấy danh mục", 404));

    return res.status(200).json({
      data: category,
      status: 200,
      message: "Lấy dữ liệu thành công",
    });
  } catch (err) {
    next(err);
  }
};

const createCategory = async (req, res, next) => {
  const data = req.body;
  try {
    const existingCategory = await Category.findOne({ slug: data.slug });
    if (existingCategory) {
      return next(
        new CustomError(`Slug "${existingCategory.slug}" đã được sử dụng`, 400)
      );
    }

    const newCat = new Category(data);
    const saveCat = await newCat.save();
    return res.status(201).json({
      data: saveCat,
      message: "Tạo danh mục thành công",
      status: 201,
    });
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  const { id } = req.params; // Lấy ID từ tham số URL
  const { slug } = req.body; // Lấy slug từ request body

  try {
    // Tìm danh mục theo ID
    const category = await Category.findById(id);

    // Kiểm tra nếu không tìm thấy danh mục
    if (!category) {
      return next(new CustomError("Không tìm thấy danh mục", 404));
    }

    // Kiểm tra nếu slug mới đã tồn tại trên một danh mục khác
    if (slug) {
      const existingCategory = await Category.findOne({
        slug,
        _id: { $ne: id },
      });
      if (existingCategory) {
        return next(new CustomError(`Slug "${slug}" đã được sử dụng`, 400));
      }
    }

    // Cập nhật danh mục với dữ liệu mới
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true, // Trả về đối tượng sau khi cập nhật
    });

    // Trả về kết quả
    return res.status(200).json({
      message: "Cập nhật thành công",
      status: 200,
      data: updatedCategory,
    });
  } catch (err) {
    // Xử lý lỗi
    next(err);
  }
};
const deleteCategory = async (req, res, next) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);

    if (!category) return next(new CustomError("Không tìm thấy danh mục", 404));

    await Category.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Đã xóa sản phẩm",
      status: 200,
      data: category,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCategory,
  fetchCategories,
  deleteCategory,
  updateCategory,
  fetchCategory,
};
