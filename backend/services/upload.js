const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadToCloudinary = async (path, folder = "rex-sport") => {
  if (!path) {
    throw new Error("Đường dẫn ảnh không hợp lệ!");
  }
  try {
    const data = await cloudinary.uploader.upload(path, { folder });
    return { url: data.secure_url, publicId: data.public_id };
  } catch (err) {
    throw new Error("Không thể tải ảnh lên!");
  }
};
module.exports = { uploadToCloudinary };
