const express = require('express');
const cors = require('cors');
const cloudinaryRoutes = require('./routes/cloudinary');

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/cloudinary", cloudinaryRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server kita berjalan di http://localhost:${PORT}`);
});