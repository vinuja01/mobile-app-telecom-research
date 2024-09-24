//vinuja1234
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const authRoutes = require("./routes/auth");
const faceRecognitionRouter = require("./routes/face_recognition");

const app = express();
const port = 5001;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Basic route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Routes
const employeeRoutes = require("./routes/employees");
const siteRoutes = require("./routes/sites");

app.use("/api/employees", employeeRoutes);
app.use("/api/sites", siteRoutes);
app.use("/api", authRoutes);
app.use("/api/face-recognition", faceRecognitionRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
