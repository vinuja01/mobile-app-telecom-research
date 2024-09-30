// routes/face_recognition.js
const express = require("express");
const router = express.Router();
const Alert = require("../models/Alerts"); // Import the Alert model

// Endpoint to handle POST requests from the Python script
router.post("/notify", async (req, res) => {
  const data = req.body;
  console.log("Received data:", data);

  try {
    // Validate incoming data
    if (!data.user || typeof data.confidence !== "number") {
      return res.status(400).json({ message: "Invalid data format" });
    }

    // Save to database
    const alert = new Alert({
      user: data.user,
      confidence: data.confidence,
      timestamp: data.timestamp ? new Date(data.timestamp) : new Date(),
    });
    await alert.save();
    console.log("Alert saved to database:", alert);

    // Emit 'notification' event to all connected clients
    const io = req.app.get("io");
    io.emit("notification", data);

    res.status(200).json({ message: "Data received and saved successfully" });
  } catch (error) {
    console.error("Error saving alert to database:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET endpoint to retrieve alerts
router.get("/alerts", async (req, res) => {
  try {
    // Fetch alerts from database, sorted by most recent
    const alerts = await Alert.find().sort({ timestamp: -1 }).limit(100); // Adjust limit as needed
    res.status(200).json(alerts);
  } catch (error) {
    console.error("Error fetching alerts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
