const CustomError = require("../utils/customError");
const Collection = require("../models/Collection.model");
const { uploadToCloudinary } = require("../services/upload.js");
const { mongoose } = require("mongoose");

// Create a Collection
const createCollection = async (req, res, next) => {
  try {
    const { name, description, products, image, status, priority, slug } =
      req.body;

    if (!name || !image) return next(new CustomError("Bad request !!", 400));

    const updateImage = await uploadToCloudinary(image);

    const newCollection = new Collection({
      name,
      slug,
      description,
      products,
      image: updateImage,
      status: status ?? true,
      priority: priority ?? 0,
    });

    await newCollection.save();

    res.status(201).json({
      message: "Tạo bộ sưu tập thành công",
      data: newCollection,
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Collections
const getAllCollections = async (req, res, next) => {
  try {
    const collections = await Collection.find().populate("products");

    return res.status(200).json({
      message: "Lay du lieu thanh cong",
      data: collections,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Get Collection by ID or Slug
const getCollectionByIdOrSlug = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;

    let query;
    if (mongoose.Types.ObjectId.isValid(idOrSlug)) {
      query = { _id: idOrSlug };
    } else {
      query = { slug: idOrSlug };
    }

    const collection = await Collection.findOne(query).populate("products");

    if (!collection)
      return res.status(404).json({ message: "Không tìm thấy bộ sưu tập" });

    return res.status(200).json({
      message: "Lấy dữ liệu thành công",
      data: collection,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Update Collection
const updateCollection = async (req, res, next) => {
  const { idOrSlug } = req.params;
  const { image } = req.body;

  try {
    let query;
    if (mongoose.Types.ObjectId.isValid(idOrSlug)) {
      query = { _id: idOrSlug };
    } else {
      query = { slug: idOrSlug };
    }

    let collection = await Collection.findOne(query).populate("products");

    if (!collection) {
      return next(new CustomError("Không tìm thấy collection !!", 400));
    }

    // Nếu có ảnh mới, upload lên Cloudinary
    if (image && !image.publicId) {
      req.body.image = await uploadToCloudinary(image);
    }

    // ✅ Sửa lại đoạn cập nhật collection
    const newCollection = await Collection.findOneAndUpdate(
      query,
      { ...req.body },
      { new: true } // ✅ Trả về collection mới sau update
    );

    return res.status(200).json({
      message: "Cập nhật bộ sưu tập thành công",
      data: newCollection,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Delete Collection
const deleteCollection = async (req, res, next) => {
  try {
    const { id } = req.params;
    const collection = await Collection.findByIdAndDelete(id);

    if (!collection)
      return res.status(404).json({ message: "Không tìm thấy bộ sưu tập" });

    res.status(200).json({ message: "Xóa bộ sưu tập thành công" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  deleteCollection,
  createCollection,
  getAllCollections,
  getCollectionByIdOrSlug,
  updateCollection,
};
