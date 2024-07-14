const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
  },
  employeeName: {
    type: String,
    required: true,
  },
  arrivalDate: {
    type: Date,
    required: true,
  },
  siteLocation: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  tasksDone: {
    type: [String],
    required: true,
  },
  hoursSpent: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
