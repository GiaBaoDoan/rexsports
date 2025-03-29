const {
  fetchProducts,
  fetchDetailProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const express = require("express");
const router = express.Router();

// Get all products
router.get("/", fetchProducts);

// Get detail product
router.get("/:idOrSlug", fetchDetailProduct);

// Create a new product
router.post("/", createProduct);

// edit prudct by id
router.put("/:productId", updateProduct);

//
router.delete("/:id", deleteProduct);

module.exports = router;
