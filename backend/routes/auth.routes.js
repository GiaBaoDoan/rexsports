const express = require("express");
const {
  getMe,
  login,
  signup,
  updateProfile,
  updatePassword,
  logout,
  verifyEmail,
  forgotPassword,
  resetNewPassword,
} = require("../controllers/auth.controller");
const verifyToken = require("../middleware/auth.middleware");
const UploadMiddleware = require("../middleware/upload.middleware");

const router = express.Router();

router.get("/me", verifyToken, getMe);
router.put("/updatePassword", verifyToken, updatePassword);
router.put("/me", verifyToken, UploadMiddleware("avatars"), updateProfile);
router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/verify/:id/:token", verifyEmail);
router.post("/reset-password/:userId/:token", resetNewPassword);
router.post("/new-password", forgotPassword);

module.exports = router;
