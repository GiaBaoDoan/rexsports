const express = require("express");
const {
  deleteCollection,
  createCollection,
  getAllCollections,
  getCollectionByIdOrSlug,
  updateCollection,
} = require("../controllers/collection.controller");

const router = express.Router();

router.post("/", createCollection);
router.get("/:idOrSlug", getCollectionByIdOrSlug);
router.put("/:idOrSlug", updateCollection);
router.get("/", getAllCollections);
router.delete("/:id", deleteCollection);

module.exports = router;
