const { handleImage } = require("../utils/helper");

const UploadMiddleware = (folder = "") => {
  return async (req, res, next) => {
    try {
      if (Array.isArray(req.body.images)) {
        req.body.images = await Promise.all(
          req.body.images.map((img) => handleImage(img, folder))
        );
      }

      if (req.body.image || req.body.bill) {
        req.body.image = await handleImage(req.body.image, folder);
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = UploadMiddleware;
