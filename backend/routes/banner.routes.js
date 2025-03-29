const express = require("express");
const {
  fetchBanners,
  fetchBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
} = require("../controllers/banner.controller");

const router = express.Router();

router.post("/", createBanner);
router.get("/:id", fetchBannerById);
router.put("/:id", updateBanner);
router.get("/", fetchBanners);
router.delete("/:id", deleteBanner);

module.exports = router;
