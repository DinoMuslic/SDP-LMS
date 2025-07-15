require("dotenv").config({ path: ".env" });

const request = require("supertest");
const app = require("../app");
const db = require("../models/db");

describe("Authentication API", () => {
  const testUser = {
    first_name: "Test",
    last_name: "User",
    email: "testuser@example.com",
    password: "testpassword123",
  };

  afterAll(async () => {
    await db.query("DELETE FROM users WHERE email = ?", [testUser.email]);
    await db.end?.();
  });

  describe("POST /api/auth/register", () => {
    test("should register a new user", async () => {
      const response = await request(app).post("/api/auth/register").send(testUser);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toMatch(/registered/i);
    });

    test("should return error if required fields are missing", async () => {
      const response = await request(app).post("/api/auth/register").send({
        email: "incomplete@example.com",
      });

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toMatch(/all fields are required/i);
    });

    test("should not allow duplicate registration", async () => {
      const response = await request(app).post("/api/auth/register").send(testUser);

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toMatch(/already exists/i);
    });
  });

  describe("POST /api/auth/login", () => {
    test("should login successfully with correct credentials", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: testUser.email,
        password: testUser.password,
      });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("user");
      expect(response.body.user).toHaveProperty("token");
      expect(response.body.user.email).toBeUndefined();
    });

    test("should return error for incorrect password", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: testUser.email,
        password: "wrongpassword",
      });

      expect(response.statusCode).toBe(401);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toMatch(/invalid credentials/i);
    });

    test("should return error for non-existent user", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "notfound@example.com",
        password: "irrelevant",
      });

      expect(response.statusCode).toBe(401);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toMatch(/invalid credentials/i);
    });
  });
});
