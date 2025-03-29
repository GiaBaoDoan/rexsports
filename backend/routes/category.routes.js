const express = require("express");
const {
  createCategory,
  fetchCategories,
  fetchCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/category.controller");

const router = express.Router();

router.post("/", createCategory);
router.get("/:id", fetchCategory);
router.put("/:id", updateCategory);
router.get("/", fetchCategories);
router.delete("/:id", deleteCategory);

module.exports = router;
