const { mongoose } = require("mongoose");
const ImageSchema = require("./Image.schema");

const Roles = require("../constants/roles");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: { type: String, unique: true, required: true },
    image: ImageSchema,
    password: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: [Roles.ADMIN, Roles.USER],
      default: Roles.USER,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
