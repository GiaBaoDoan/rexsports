const Product = require("../models/Product.model");
const CustomError = require("../utils/customError");

const httpStatus = require("../constants/httpStatus");
const { isValidId, handleImage } = require("../utils/helper");
const getPagination = require("../utils/pagination.util");

const getAllProducts = async ({ category, sortByPrice, page, limit }) => {
  const filters = {
    ...(category ? { category } : {}),
  };

  const sort = {
    price: sortByPrice === "desc" ? -1 : 1,
  };

  const totalRecords = await Product.countDocuments(filters);

  const { skip, currentPage, totalPages } = getPagination(
    totalRecords,
    parseInt(page),
    parseInt(limit)
  );

  const products = await Product.find(filters)
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit));

  return {
    products,
    pagination: { totalRecords, totalPages, currentPage, limit },
  };
};

const getProductById = async (idOrSlug) => {
  const query = isValidId(idOrSlug) ? { _id: idOrSlug } : { slug: idOrSlug };
  const product = await Product.findOne(query).populate("category");

  if (!product) {
    throw new CustomError("Không tìm thấy product", httpStatus.NOT_FOUND);
  }

  return product;
};

const createProduct = async (data) => {
  const checkSlug = await Product.findOne({ slug: data.slug });

  if (checkSlug) {
    throw new CustomError(
      `Slug ${data.slug} đã được sử dụng`,
      httpStatus.BAD_REQUEST
    );
  }

  data.variants = await Promise.all(
    data.variants.map(async (variant) => ({
      ...variant,
      icon: await handleImage(variant.icon, "variants"),
    }))
  );

  const newProduct = await Product.create({
    ...data,
    status: data.status === "true",
  });

  return newProduct;
};

const updateProductService = async (productId, data) => {
  await getProductById(productId);

  const existSlug = await Product.findOne({
    slug: data.slug,
    _id: { $ne: productId },
  });

  if (existSlug)
    throw new CustomError(
      `Slug "${data.slug}" đã được sử dụng`,
      httpStatus.BAD_REQUEST
    );

  data.variants = await Promise.all(
    data.variants.map(async (variant) => ({
      ...variant,
      icon: await handleImage(variant.icon, "variants"),
    }))
  );

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      ...data,
      status: data.status === "true",
    },
    { new: true }
  );

  return updatedProduct;
};

const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new CustomError("Không tìm thấy product", httpStatus.NOT_FOUND);
  }

  return product;
};

module.exports = {
  deleteProduct,
  getProductById,
  getAllProducts,
  createProduct,
  updateProductService,
};
