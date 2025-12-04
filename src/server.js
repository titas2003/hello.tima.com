// src/server.js
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger/swagger.js";
import connectDB from "./config/db.js";
import app from "./app.js";

dotenv.config();

// Connect to MongoDB only in production
connectDB();

// Swagger docs
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
