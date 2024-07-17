const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema({
  siteId: {
    type: String,
    required: true,
  },
  siteLocation: {
    type: String,
    required: true,
  },
  currentFaults: {
    type: [String],
    required: true,
  },
  MaintainanceRecords: {
    type: [String],
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Site", siteSchema);
