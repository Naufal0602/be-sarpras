const express = require("express");
const cors = require("cors");
const cloudinaryRoutes = require("./routes/cloudinary");
const serverless = require("serverless-http");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/cloudinary", cloudinaryRoutes);

module.exports = app;
module.exports.handler = serverless(app);
