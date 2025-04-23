const httpStatus = require("../constants/httpStatus");
const Banner = require("../models/Banner.model");
const CustomError = require("../utils/customError");

const getAllBanners = async () => {
  const banners = await Banner.find().sort({
    createdAt: -1,
  });
  return banners;
};

const getBannerById = async (id) => {
  const banner = await Banner.findById(id);
  if (!banner)
    throw new CustomError("Không tìm thấy banner", httpStatus.NOT_FOUND);

  return banner;
};

const createBanner = async (data) => {
  const banner = new Banner({
    ...data,
  });

  const newBanner = await banner.save();

  return newBanner;
};

const updateBanner = async (id, data) => {
  await getBannerById(id);

  const updatedBanner = await Banner.findByIdAndUpdate(
    id,
    { ...data },
    { new: true }
  );

  return updatedBanner;
};

const deleteBanner = async (id) => {
  const banner = await Banner.findByIdAndDelete(id);
  if (!banner)
    throw new CustomError("Không tìm thấy banner", httpStatus.NOT_FOUND);

  return banner;
};

module.exports = {
  getAllBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
  createBanner,
};
