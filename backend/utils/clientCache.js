const redis = require("redis");

let client;

const connectRedis = async () => {
  if (!client) {
    client = redis.createClient({ url: "redis://redis:6379" });

    client.on("error", (err) => console.error("❌ Redis error:", err));
    client.on("connect", () => console.log("✅ Redis connected"));
    client.on("end", () => console.warn("⚠️ Redis client closed"));

    await client.connect(); // Chờ kết nối hoàn tất trước khi sử dụng
  }
  return client;
};

module.exports = { connectRedis };
