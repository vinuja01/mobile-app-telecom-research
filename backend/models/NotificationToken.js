// models/NotificationToken.js

const mongoose = require("mongoose");

const NotificationTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    // Optionally, add user/device info fields here
  },
  { timestamps: true }
);

module.exports = mongoose.model("NotificationToken", NotificationTokenSchema);
