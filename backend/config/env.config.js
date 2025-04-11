const dotenv = require("dotenv");
dotenv.config();

const config = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
  CLIENT_URL: process.env.CLIENT_URL,
  HOST: process.env.HOST,
  SERVICE: process.env.SERVICE,
  USER: process.env.USER,
  PASS: process.env.PASS,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT || 5000,
};

module.exports = config;
