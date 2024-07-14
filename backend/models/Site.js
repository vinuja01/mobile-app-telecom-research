const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema({
  siteId: {
    type: Number,
    required: true,
  },
  siteLocation: {
    type: String,
    required: true,
  },
  currentFaults: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Site", siteSchema);
