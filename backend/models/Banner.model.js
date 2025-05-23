const mongoose = require("mongoose");
const ImageSchema = require("./Image.schema");

const bannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: false },
    image: ImageSchema,
    link: { type: String, required: false },
    status: { type: Boolean, default: true },
    description: { type: String, require: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);
