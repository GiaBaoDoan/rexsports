const express = require("express");
const {
  createOrder,
  fetchOrders,
  fetchOrder,
  updateStatusOrder,
  deleteOrder,
} = require("../controllers/order.controller");
const router = express.Router();

router.post("/", createOrder);
router.get("/", fetchOrders);
router.get("/:id", fetchOrder);
router.put("/:id", updateStatusOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
