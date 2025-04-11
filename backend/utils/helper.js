const { default: mongoose } = require("mongoose");
const { uploadToCloudinary } = require("../services/cloudinary.service");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const isBase64 = (str) => {
  const regex = /^data:image\/[a-zA-Z]+;base64,/;
  return regex.test(str);
};

const handleImage = async (image, folder) => {
  if (image && typeof image === "string" && isBase64(image)) {
    return await uploadToCloudinary(image, folder);
  }
  return image;
};

module.exports = { isValidId, isBase64, handleImage };
