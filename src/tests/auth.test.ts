import * as UserService from "../services/user.service";

import { ConflictError, NotFoundError, UnauthorizedError } from "../errors";

import app from "..";
import jwt from "jsonwebtoken";
import request from "supertest";

// Mock the services
jest.mock("../services/user.service");

describe("Auth API Endpoints", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  describe("POST /auth/register", () => {
    it("should register a new user successfully", async () => {
      (UserService.registerUserService as jest.Mock).mockResolvedValueOnce({
        id: "mockUserId",
        email: "test@example.com",
        username: "testUser",
      });

      const response = await request(app).post("/api/v1/auth/register").send({
        email: "test@example.com",
        password: "securePassword123",
        username: "testUser",
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        "message",
        "User registered successfully."
      );
    });

    it("should return 400 for invalid input", async () => {
      (UserService.registerUserService as jest.Mock).mockRejectedValueOnce(
        new Error("Invalid input")
      );

      const response = await request(app).post("/api/v1/auth/register").send({
        email: "not-an-email",
        password: "short",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error", "Invalid input");
    });

    it("should return 409 if email already exists", async () => {
      (UserService.registerUserService as jest.Mock).mockRejectedValueOnce(
        new ConflictError("Email is already in use.")
      );

      const response = await request(app).post("/api/v1/auth/register").send({
        email: "test@example.com",
        password: "securePassword123",
        username: "testUser",
      });

      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty("error", "Email is already in use.");
    });
  });

  describe("POST /auth/login", () => {
    it("should login successfully and return a JWT token", async () => {
      (UserService.loginUserService as jest.Mock).mockResolvedValueOnce({
        token: "mockToken",
      });

      const response = await request(app).post("/api/v1/auth/login").send({
        email: "test@example.com",
        password: "securePassword123",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token", "mockToken");
    });

    it("should return 401 for invalid credentials", async () => {
      (UserService.loginUserService as jest.Mock).mockRejectedValueOnce(
        new UnauthorizedError("Invalid credentials.")
      );

      const response = await request(app).post("/api/v1/auth/login").send({
        email: "test@example.com",
        password: "wrongPassword",
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error", "Invalid credentials.");
    });
  });

  describe("POST /auth/generate-api-key", () => {
    it("should generate an API key for authenticated user", async () => {
      (UserService.generateApiKeyService as jest.Mock).mockResolvedValueOnce({
        apiKey: "mockApiKey",
      });

      const token = jwt.sign(
        { id: "mockUserId" },
        process.env.JWT_SECRET || "secret_key",
        { expiresIn: "1h" }
      );

      const response = await request(app)
        .post("/api/v1/auth/generate-api-key")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("apiKey", "mockApiKey");
    });

    it("should return 404 if user is not found", async () => {
      (UserService.generateApiKeyService as jest.Mock).mockRejectedValueOnce(
        new NotFoundError("User not found")
      );

      const token = jwt.sign(
        { id: "677a2ebeb2a40bbe96af05c5" },
        process.env.JWT_SECRET || "secret_key",
        { expiresIn: "1h" }
      );

      const response = await request(app)
        .post("/api/v1/auth/generate-api-key")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error", "User not found");
    });

    it("should return 401 if user is not authenticated", async () => {
      (UserService.generateApiKeyService as jest.Mock).mockRejectedValueOnce(
        new UnauthorizedError("Unauthorized")
      );

      const response = await request(app).post("/api/v1/auth/generate-api-key");

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error", "Unauthorized");
    });
  });
});
