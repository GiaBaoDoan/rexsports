const express = require("express");

const productRoutes = require("./product.routes");
const orderRoutes = require("./order.routes");
const categoryRoutes = require("./category.routes");
const bannerRoutes = require("./banner.routes");
const collectionRoutes = require("./collection.routes");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const dashboardRoutes = require("./dashboard.routes");

const router = express.Router();

router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.use("/categories", categoryRoutes);
router.use("/banners", bannerRoutes);
router.use("/collections", collectionRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
