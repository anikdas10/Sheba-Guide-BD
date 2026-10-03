const express = require("express");
const cors = require("cors");
require("dotenv").config();
const aiRoutes = require("./routes/ai.route");
const app = express();
const { connectDB } = require("../config/db");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ShebaGuide BD API is running 🚀",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    service: "ShebaGuide BD",
    status: "healthy",
  });
});

app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`ShebaGuide BD server running on port ${PORT}`);
  });
}

startServer();
