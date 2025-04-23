const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  UpdateOrder,
  deleteOrder,
  sendOrderConfirmationEmail,
} = require("../controllers/order.controller");
const UploadMiddleware = require("../middleware/upload.middleware");
const router = express.Router();

router.post("/", UploadMiddleware("bills"), createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.put("/:id", UpdateOrder);
router.delete("/:id", deleteOrder);
router.post("/send-email/:orderId", sendOrderConfirmationEmail);

module.exports = router;
