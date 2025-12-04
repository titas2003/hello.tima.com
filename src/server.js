// src/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger/swagger.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// DB
connectDB();

// Swagger - mount BEFORE your API routes (so docs are available)
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes - userRoutes defines /auth/* and /users/*
app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
