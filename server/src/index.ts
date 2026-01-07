import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/database";
import leadRoutes from "./routes/leadRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import { errorHandler, notFound } from "./middleware/errorHandler";

// Load environment variables from the server root `.env` file,
// regardless of the current working directory.
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const app: Application = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/leads", leadRoutes);
app.use("/api/upload", uploadRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
