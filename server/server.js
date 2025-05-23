import express from "express";
import cors from "cors";
import "dotenv/config";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhooks.js";

// Initialize Express
const app = express();

// Connect to database (wrap in an async function)
(async () => {
  await connectDB();
})();

// Middlewares
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("API Working");
});
app.post('/clerk', express.json(), clerkWebhooks)

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
