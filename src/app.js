// src/app.js
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());
app.use(cors());

// Only routes, no DB connection
app.use("/api", userRoutes);

export default app;
