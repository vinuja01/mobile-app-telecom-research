// facerecognition.js
const express = require("express");
const router = express.Router();

// Endpoint to handle POST requests from the Python script
router.post("/notify", (req, res) => {
  const data = req.body;
  console.log("Received data:", data);

  // Emit 'notification' event to all connected clients
  const io = req.app.get("io");
  io.emit("notification", data);

  // You can add code here to save data to the database or perform other actions
  res.status(200).json({ message: "Data received successfully" });
});

module.exports = router;
