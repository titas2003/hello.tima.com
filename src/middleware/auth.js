// src/middleware/auth.js
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    // Expected Authorization header: "Bearer <token>"
    const authHeader = req.headers["authorization"] || req.headers["Authorization"];
    if (!authHeader) return res.status(401).json({ message: "Access denied. No token provided." });

    const parts = authHeader.split(" ");
    const token = parts.length === 2 ? parts[1] : parts[0]; // tolerate both 'Bearer <token>' and '<token>'

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid or expired token" });
      req.user = decoded; // contains id and email
      next();
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
