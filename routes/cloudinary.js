const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dppfdwttz",
  api_key: "955622587918424",
  api_secret: "UTwSgK1RIp7yE0rp4GNMgNa2X64"
});

router.post("/", async (req, res) => {
  const { public_id } = req.body;

  if (!Array.isArray(public_id) || public_id.length === 0) {
    return res.status(400).json({ success: false, message: "public_id array is required" });
  }

  try {
    const results = await Promise.all(
      public_id.map(id => cloudinary.uploader.destroy(id))
    );

    res.json({ success: true, results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
