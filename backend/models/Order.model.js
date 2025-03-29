const { mongoose } = require("mongoose");

const CartSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  variantId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  color: { type: String, required: true },
  size: { type: String, required: true },
  icon: {
    type: String,
    required: true,
  },
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
      enum: ["COD", "VNPay"],
      required: true,
    },
    shipping: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
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
