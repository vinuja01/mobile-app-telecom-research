// models/UserAssign.js
const mongoose = require("mongoose");

const userAssignSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const UserAssign = mongoose.model(
  "UserAssign",
  userAssignSchema,
  "userassigns"
);

module.exports = UserAssign;
