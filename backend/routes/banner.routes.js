const express = require("express");
const {
  getAllBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
} = require("../controllers/banner.controller");
const UploadMiddleware = require("../middleware/upload.middleware");

const router = express.Router();

router.post("/", UploadMiddleware("banners"), createBanner);
router.put("/:id", UploadMiddleware("banners"), updateBanner);
router.get("/:id", getBannerById);
router.get("/", getAllBanners);
router.delete("/:id", deleteBanner);

module.exports = router;
