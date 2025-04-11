const ProductServices = require("../services/product.service");
const httpStatus = require("../constants/httpStatus");

const getAllProducts = async (req, res, next) => {
  const { category, sortByPrice = "asc", page = 1, limit } = req.query;

  try {
    const { products, pagination } = await ProductServices.getAllProducts({
      category,
      sortByPrice,
      page,
      limit,
    });

    return res.status(httpStatus.OK).json({
      data: products,
      message: "Lấy dữ liệu thành công",
      status: httpStatus.OK,
      pagination,
    });
  } catch (err) {
    next(err);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await ProductServices.getProductById(req.params.idOrSlug);
    return res.status(httpStatus.OK).json({
      data: product,
      message: "Lấy dữ liệu thành công",
      status: httpStatus.OK,
    });
  } catch (err) {
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const newProduct = await ProductServices.createProduct(req.body);
    return res.status(httpStatus.CREATED).json({
      data: newProduct,
      message: "Đã tạo sản phẩm mới",
      status: httpStatus.CREATED,
    });
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const updated = await ProductServices.updateProductService(
      req.params.productId,
      req.body
    );

    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Cập nhật sản phẩm thành công",
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await ProductServices.deleteProduct(req.params.id);
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Đã xóa sản phẩm",
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
