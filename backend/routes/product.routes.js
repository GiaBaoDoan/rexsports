const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const express = require("express");
const UploadMiddleware = require("../middleware/upload.middleware");
const router = express.Router();

router.get("/", getAllProducts);
router.get("/:idOrSlug", getProductById);
router.post("/", UploadMiddleware("products"), createProduct);
router.put("/:productId", UploadMiddleware("products"), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
