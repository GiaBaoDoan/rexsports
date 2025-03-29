const { Product } = require("../models/Product.model");
const CustomError = require("../utils/customError");
const { uploadToCloudinary } = require("../services/upload");
const { isValidObjectId } = require("mongoose");

// fetch all products
const fetchProducts = async (req, res, next) => {
  const {
    isSortPrice = "false",
    isAdmin = "false",
    cat,
    page = 1,
    isAvailable,
    limit = isAdmin === "true" ? 5 : null,
  } = req.query;

  const isPriceDescending = isSortPrice === "true";
  const filters = {
    ...(cat ? { category: cat } : {}),
    ...(isAvailable
      ? { "variants.stock": isAvailable === "true" ? { $gt: 0 } : 0 }
      : {}),
  };
  const sortOption = { price: isPriceDescending ? -1 : 1, createdAt: -1 };

  try {
    const totalRecords = await Product.countDocuments(filters);
    const totalPages = Math.ceil(totalRecords / parseInt(limit));
    const currentPage = page > totalPages ? 1 : parseInt(page);
    const skip = (currentPage - 1) * limit;

    const products = await Product.find(filters)
      .sort(sortOption)
      .limit(limit)
      .skip(skip)
      .populate("category");

    const responseData = {
      data: products,
      pagination: {
        totalRecords,
        totalPages,
        currentPage,
        limit: parseInt(limit),
      },
      message: "Lấy dữ liệu thành công",
      status: 200,
    };

    return res.status(200).json(responseData);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// fetch product by id
const fetchDetailProduct = async (req, res, next) => {
  const { idOrSlug } = req.params;

  let query;
  if (isValidObjectId(idOrSlug)) {
    query = { _id: idOrSlug };
  } else {
    query = { slug: idOrSlug };
  }

  try {
    const product = await Product.findOne(query).populate("category");
    if (!product) return next(new CustomError("Sản phẩm không tồn tại", 404));

    return res.status(200).json({
      status: 200,
      data: product,
      message: "Lấy dữ liệu thành công",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// create new product
const createProduct = async (req, res, next) => {
  const { images, variants = [], status, slug, ...data } = req.body;

  const newStatus = status === "true";

  try {
    const checkSlug = await Product.findOne({ slug });

    if (checkSlug) {
      return next(new CustomError(400, `Slug ${slug} đã được sử dụng`));
    }

    if (images) {
      const uploadedImages = await Promise.all(
        images.map((image) => uploadToCloudinary(image))
      );
      data.images = uploadedImages;
    }

    const processedVariants = await Promise.all(
      variants.map(async (variant) => {
        if (variant.icon) {
          const icon = await uploadToCloudinary(variant.icon);
          variant.icon = icon;
        }
        return variant;
      })
    );

    const newProduct = new Product({
      ...data,
      status: newStatus,
      slug,
      variants: processedVariants,
    });
    const savedProduct = await newProduct.save();

    return res.status(201).json({
      status: 201,
      data: savedProduct,
      message: "Thêm sản phẩm thành công",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  const { productId } = req.params;
  const { images, slug, status, variants, ...data } = req.body;

  const newStatus = status === "true";
  try {
    if (slug) {
      const checkSlug = await Product.findOne({
        slug,
        _id: { $ne: productId },
      });
      if (checkSlug) {
        return next(new CustomError(`Slug ${slug} đã được sử dụng`, 400));
      }
    }

    // Tìm sản phẩm trong database
    const product = await Product.findById(productId);
    if (!product) {
      return next(new CustomError("Không tìm thấy sản phẩm này", 404));
    }

    // 1️⃣ Upload ảnh sản phẩm nếu có

    const imagesToUpload = images.filter((image) => !image.publicId);

    if (imagesToUpload.length > 0) {
      const uploadedImages = await Promise.all(
        imagesToUpload.map((image) => uploadToCloudinary(image))
      );
      data.images = [
        ...images.filter((image) => image.publicId),
        ...uploadedImages,
      ];
    }

    // // 2️⃣ Xử lý cập nhật variants
    const processedVariants = await Promise.all(
      variants.map(async (variant) => {
        if (variant.icon && !variant.icon.publicId) {
          const icon = await uploadToCloudinary(variant.icon);
          variant.icon = icon;
        }
        return variant;
      })
    );

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        ...data,
        slug,
        variants: processedVariants,
        status: newStatus,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      status: 200,
      message: "Cập nhật sản phẩm thành công",
      data: updatedProduct,
    });
  } catch (err) {
    next(err);
  }
};

// delete by id
const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) next(new CustomError("Không tìm thấy sản phẩm này", 404));

    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Đã xóa sản phẩm",
      status: 200,
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  fetchProducts,
  fetchDetailProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
