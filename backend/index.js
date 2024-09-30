// index.js
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// Importing Routes
const authRoutes = require("./routes/auth");
const faceRecognitionRouter = require("./routes/face_recognition");
const employeeRoutes = require("./routes/employees");
const siteRoutes = require("./routes/sites");

const app = express();
const port = 5001;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io server
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust for security in production
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Middleware Configuration
app.use(
  cors({
    origin: "*", // Replace "*" with your frontend's URL in production for better security
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json()); // To parse JSON bodies

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Basic Route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Registering Routes
app.use("/api/employees", employeeRoutes);
app.use("/api/sites", siteRoutes);
app.use("/api", authRoutes);
app.use("/api/face-recognition", faceRecognitionRouter); // Face Recognition Routes

// Handle Socket.io connections
io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Make io accessible to routes
app.set("io", io);

// Start the Server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
