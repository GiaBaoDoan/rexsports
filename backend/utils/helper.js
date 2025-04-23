const { mongoose } = require("mongoose");
const dayjs = require("dayjs");
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

const getDate = (time) => {
  return dayjs().startOf(time).toDate();
};

module.exports = { isValidId, isBase64, handleImage, getDate };
