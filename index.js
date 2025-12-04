import app from "./src/server.js";

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`API CRUD Server running on port ${PORT}`));
