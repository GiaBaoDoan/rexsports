const { mongoose } = require("mongoose");

const collectionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    status: { type: Boolean, default: true },
    slug: { type: String, required: true, unique: true },
    priority: { type: Number, default: 0 },
    image: {
      url: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Collection", collectionSchema);
