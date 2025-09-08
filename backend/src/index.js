// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const subjectRoutes = require("./routes/subjectRoutes");
const qaRoutes = require("./routes/qaRoutes");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // your frontend URL
  credentials: true, // allow cookies/auth headers
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/subjects", subjectRoutes);
app.use("/api/qa", qaRoutes);

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/quizletClone";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
