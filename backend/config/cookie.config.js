const { NODE_ENV } = require("./env.config");

const cookieOptions = {
  secure: NODE_ENV === "production",
  path: "/",
  sameSite: NODE_ENV === "production" ? "none" : "lax",
  expires: new Date(Date.now() + 60 * 60 * 1000),
  httpOnly: true,
};

module.exports = cookieOptions;
