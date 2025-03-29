const Banner = require("../models/Banner.model");
const CustomError = require("../utils/customError");
const { uploadToCloudinary } = require("../services/upload");

const fetchBanners = async (req, res, next) => {
  try {
    const banners = await Banner.find();

    return res.status(200).json({
      data: banners,
      status: 200,
      message: "Lấy dữ liệu thành công",
    });
  } catch (err) {
    next(err);
  }
};
const fetchBannerById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const banner = await Banner.findById(id);
    if (!banner) return next(new CustomError("Khong tim thay banner", 404));
    return res.status(200).json({
      data: banner,
      message: "Lay du lieu thanh cong",
      status: 200,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const createBanner = async (req, res, next) => {
  try {
    const { title, image, link, status } = req.body;

    if (!image || !title || !link) {
      return next(new CustomError("Bad request !!", 400));
    }

    const newImage = await uploadToCloudinary(image);

    const newBanner = new Banner({
      title,
      image: newImage,
      link,
      status: status ?? true,
    });

    await newBanner.save();

    res.status(201).json({
      message: "Banner được tạo thành công",
      data: newBanner,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateBanner = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const checkId = await Banner.findById(id);

    if (!checkId) {
      return next(new CustomError("Không tìm thấy banner", 404));
    }

    if (data.image && !data.image.publicId) {
      const updatedImage = await uploadToCloudinary(req.body.image);
      data.image = updatedImage;
    }

    const updateBanner = await Banner.findByIdAndUpdate(
      id,
      { ...data },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Cập nhật banner thành công",
      data: updateBanner,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteBanner = async (req, res, next) => {
  const { id } = req.params;
  try {
    const banner = Banner.findById(id);
    if (!banner) return next(new CustomError("Khong tim thay banner", 404));

    await Banner.findByIdAndDelete(id);

    return res.status(200).json({
      data: banner,
      message: "Xoa thanh cong",
      status: 200,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  fetchBanners,
  createBanner,
  fetchBannerById,
  updateBanner,
  deleteBanner,
};
