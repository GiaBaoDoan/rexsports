const express = require("express");
const {
  getOverview,
  getReport,
} = require("../controllers/dashboard.controller");

const router = express.Router();

router.get("/", getOverview);
router.get("/report", getReport);

module.exports = router;
