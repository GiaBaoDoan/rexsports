const { mongoose } = require("mongoose");
const ImageSchema = require("./Image.schema");

const collectionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    status: { type: Boolean, default: true },
    slug: { type: String, required: true, unique: true },
    image: ImageSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Collection", collectionSchema);
