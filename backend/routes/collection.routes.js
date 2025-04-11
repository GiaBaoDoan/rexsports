const express = require("express");
const {
  deleteCollection,
  createCollection,
  getAllCollections,
  getCollectionByIdOrSlug,
  updateCollection,
} = require("../controllers/collection.controller");
const UploadMiddleware = require("../middleware/upload.middleware");

const router = express.Router();

router.post("/", UploadMiddleware("collections"), createCollection);
router.put("/:id", UploadMiddleware("collections"), updateCollection);
router.get("/:idOrSlug", getCollectionByIdOrSlug);
router.get("/", getAllCollections);
router.delete("/:id", deleteCollection);

module.exports = router;
