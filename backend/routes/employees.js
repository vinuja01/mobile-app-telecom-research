const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// Add a new employee
router.post("/", async (req, res) => {
  const {
    employeeId,
    employeeName,
    arrivalDate,
    siteLocation,
    designation,
    tasksDone,
    hoursSpent,
  } = req.body;

  const newEmployee = new Employee({
    employeeId,
    employeeName,
    arrivalDate,
    siteLocation,
    designation,
    tasksDone,
    hoursSpent,
  });

  try {
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
