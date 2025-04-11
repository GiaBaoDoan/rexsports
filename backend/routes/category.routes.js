const express = require("express");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
} = require("../controllers/category.controller");

const router = express.Router();

router.post("/", createCategory);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);
router.get("/", getAllCategories);
router.delete("/:id", deleteCategory);

module.exports = router;
