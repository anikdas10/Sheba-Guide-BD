const express = require("express");
const {
  askAI,
  classifyUserIntent,
  generateServiceGuide,
} = require("../services/ai.service");

const router = express.Router();

router.post("/ask", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const classification = await classifyUserIntent(message);
    // Step 2: Generate guide from verified knowledge
    const guide = await generateServiceGuide(message, classification);

    res.json({
      success: true,
      classification,
      guide
    });
  } catch (error) {
    console.error("AI Error:", error);

    res.status(500).json({
      success: false,
      message: "AI service failed",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
});

module.exports = router;
