// routes/auth.js
const express = require("express");
const router = express.Router();
const UserAssign = require("../models/UserAssign");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserAssign.findOne({ username, password });
  if (user) {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

module.exports = router;
