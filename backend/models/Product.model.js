const mongoose = require("mongoose");
const ImageSchema = require("./Image.schema");

const VariantSchema = new mongoose.Schema({
  icon: ImageSchema,
  size: { type: String, required: true },
  color: { type: String, required: true },
  stock: { type: Number, required: true },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      index: true,
    },
    description: { type: String, required: true },
    images: [ImageSchema],
    fakePrice: { type: Number, required: false },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    variants: [VariantSchema],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
