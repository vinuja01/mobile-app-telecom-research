// models/Alert.js
const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  user: { type: String, required: true },
  confidence: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Alert", alertSchema);
