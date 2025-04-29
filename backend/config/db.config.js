const mongoose = require("mongoose");
const { MONGO_URI } = require("./env.config");

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGO_URI);
      console.log("MongoDB connected successfully!");
    } else {
      console.log("MongoDB already connected!");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
