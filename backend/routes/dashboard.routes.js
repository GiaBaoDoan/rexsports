const express = require("express");
const { getRevenue } = require("../controllers/revenue.controller");

const router = express.Router();

router.get("/", getRevenue);

module.exports = router;
