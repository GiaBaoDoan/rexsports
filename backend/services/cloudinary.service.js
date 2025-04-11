const cloudinary = require("../config/cloudinary.config");

const uploadToCloudinary = async (path, folder) => {
  if (!path) {
    throw new Error("Đường dẫn ảnh không hợp lệ!");
  }
  try {
    const data = await cloudinary.uploader.upload(path, {
      folder: `rex-sport/${folder}`,
      overwrite: true,
    });
    return { url: data.secure_url, publicId: data.public_id };
  } catch (err) {
    throw new Error("Không thể tải ảnh lên!");
  }
};
module.exports = { uploadToCloudinary };
