const express = require("express");
const router = express.Router();
const Site = require("../models/Site");

// Add new site details
router.post("/", async (req, res) => {
  const { siteId, siteLocation, currentFaults, MaintainanceRecords, Date } =
    req.body;

  // Validate the request body
  if (
    !siteId ||
    !siteLocation ||
    !Array.isArray(currentFaults) ||
    !Array.isArray(MaintainanceRecords) ||
    !Date
  ) {
    return res
      .status(400)
      .json({
        message:
          "Invalid data. Ensure all fields are correctly filled and arrays are used for currentFaults and MaintainanceRecords.",
      });
  }

  const newSite = new Site({
    siteId,
    siteLocation,
    currentFaults,
    MaintainanceRecords,
    Date,
  });

  try {
    const savedSite = await newSite.save();
    res.status(201).json(savedSite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
