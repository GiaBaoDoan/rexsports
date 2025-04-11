const mongoose = require("mongoose");

const VariantSchema = new mongoose.Schema({
  icon: {
    url: String,
    publicId: String,
  },
  size: { type: String, required: true },
  color: { type: String, required: true },
  stock: { type: Number, required: true },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    description: { type: String, required: true },
    images: [
      {
        url: String,
        publicId: String,
      },
    ],
    fakePrice: { type: Number, required: false },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
      required: true,
    },
    variants: [VariantSchema],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
