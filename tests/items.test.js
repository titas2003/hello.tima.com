// tests/items.test.js
import request from "supertest";
import app from "../src/app.js";  // DB-free app

describe("CRUD API Routes (No DB)", () => {
  test("GET /items should return 404 if route not implemented", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(404);
  });
});
