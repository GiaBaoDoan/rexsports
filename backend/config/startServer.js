const connectDB = require("./db.config");
const { PORT } = require("./env.config");

const startServer = async (app) => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
};

module.exports = startServer;
