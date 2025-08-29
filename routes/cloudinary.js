const express = require("express");
const router = express.Router();
const { v2: cloudinary } = require("cloudinary");

// Konfigurasi pakai Environment Variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

router.post("/", async (req, res) => {
  const { public_id } = req.body;

  if (!Array.isArray(public_id) || public_id.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "public_id array is required" });
  }

  try {
    const results = await Promise.all(
      public_id.map((id) => cloudinary.uploader.destroy(id))
    );

    return res.json({ success: true, results });
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return res
      .status(500)
      .json({ success: false, message: error.message });
  }
});

module.exports = router;
