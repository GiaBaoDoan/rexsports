const cookieOptions = {
  path: "/",
  httpOnly: true,
  sameSite: "Lax",
  secure: process.env.NODE_ENV === "production",
  expires: new Date(Date.now() + 60 * 60 * 1000),
};

module.exports = cookieOptions;
