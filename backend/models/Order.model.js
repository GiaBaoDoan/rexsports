const { mongoose } = require("mongoose");
const ORDER_STATUS = require("../constants/orderStatus");
const PAYMENT = require("../constants/payment");

const CartSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  variantId: { type: String, required: true },
  quantity: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  color: { type: String, required: true },
  size: { type: String, required: true },
  icon: { type: String, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    userNote: { type: String, required: false },
    bill: { type: String, required: false },
    payment: {
      type: String,
      enum: [PAYMENT.COD, PAYMENT.VNPAY],
      required: true,
    },
    shipping: {
      type: String,
      enum: [
        ORDER_STATUS.PENDING,
        ORDER_STATUS.CONFIRMED,
        ORDER_STATUS.SHIPPED,
        ORDER_STATUS.DELIVERED,
        ORDER_STATUS.CANCELED,
      ],
      default: ORDER_STATUS.PENDING,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    adminNote: {
      type: String,
      require: false,
    },
    cart: [CartSchema],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order };
