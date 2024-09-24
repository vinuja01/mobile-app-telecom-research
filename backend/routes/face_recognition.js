const express = require("express");
const router = express.Router();

// Endpoint to handle POST requests from the Python script
router.post("/notify", (req, res) => {
  console.log("Received data:", req.body);
  // You can add code here to save data to the database or perform other actions
  res.status(200).json({ message: "Data received successfully" });
});

module.exports = router;
