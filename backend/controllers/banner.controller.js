const { successResponse } = require("../utils/response.util");

const BannerServices = require("../services/banner.service");

const getAllBanners = async (req, res, next) => {
  try {
    const banners = await BannerServices.getAllBanners();
    return successResponse(res, banners);
  } catch (err) {
    next(err);
  }
};

const getBannerById = async (req, res, next) => {
  try {
    const banner = await BannerServices.getBannerById(req.params.id);
    return successResponse(res, banner);
  } catch (err) {
    next(err);
  }
};

const createBanner = async (req, res, next) => {
  try {
    const banner = BannerServices.createBanner(req.body);
    return successResponse(res, banner, "Đã tạo banner mới !!", 201);
  } catch (error) {
    next(error);
  }
};

const updateBanner = async (req, res, next) => {
  try {
    const banner = await BannerServices.updateBanner(req.params.id, req.body);
    return successResponse(res, banner, "Đã cập nhật banner !!");
  } catch (error) {
    next(error);
  }
};

const deleteBanner = async (req, res, next) => {
  try {
    const banner = BannerServices.deleteBanner(req.params.id);
    return successResponse(res, banner, "Đã xóa banner !!");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllBanners,
  createBanner,
  getBannerById,
  updateBanner,
  deleteBanner,
};
