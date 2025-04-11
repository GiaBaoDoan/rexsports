const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const routes = require("./routes/index.routes");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/cors.config");
const startServer = require("./config/startServer");

const app = express();

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors(corsOptions));

// routes
app.use("/api", routes);

app.use(errorHandler);

startServer(app);
