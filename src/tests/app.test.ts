import User from "../models/user.model";
import express from "express";
import horoscopeRouter from "../routes/horoscope.routes";
import jwt from "jsonwebtoken";
import request from "supertest";

jest.mock("../models/user.model"); // Mock the entire user model

const app = express();
app.use("/api/v1/horoscope", horoscopeRouter);

//test d'integration
describe("Horoscope API", () => {
  it("should return zodiac sign for a valid birthdate", async () => {
    //arrange (preparation)
    const data = "1995-12-15";

    //act (execution)
    const response = await request(app).get(
      "/api/v1/horoscope?birthdate=" + data
    );
    //assert (verification)
    expect(response.status).toBe(200);
    expect(response.body.sign).toBe("Sagittarius");
    expect(response.body.zodiac).toBe("Pig");
  });

  it("should return 400 for missing birthdate", async () => {
    const response = await request(app).get("/api/v1/horoscope");
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Birthdate query parameter is required.");
  });

  it("should return 400 for invalid birthdate format", async () => {
    const response = await request(app).get(
      "/api/v1/horoscope?birthdate=invalid-date"
    );
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      "Invalid birthdate format. Use YYYY-MM-DD."
    );
  });

  describe("Secure JWT Endpoint", () => {
    it("should return zodiac sign with valid JWT token", async () => {
      const token = jwt.sign(
        { userId: "test" },
        process.env.JWT_SECRET || "secret_key"
      );
      const response = await request(app)
        .get("/api/v1/horoscope/secure-data?birthdate=1995-12-15")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.sign).toBe("Sagittarius");
      expect(response.body.zodiac).toBe("Pig");
    });

    it("should return 401 without JWT token", async () => {
      const response = await request(app).get(
        "/api/v1/horoscope/secure-data?birthdate=1995-12-15"
      );

      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Unauthorized");
    });

    it("should return 400 with JWT token but invalid birthdate", async () => {
      const token = jwt.sign(
        { userId: "test" },
        process.env.JWT_SECRET || "secret_key"
      );
      const response = await request(app)
        .get("/api/v1/horoscope/secure-data?birthdate=invalid-date")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "Invalid birthdate format. Use YYYY-MM-DD."
      );
    });
  });

  describe("Secure API Key Endpoint", () => {
    it("should return zodiac sign with valid API key", async () => {
      const mockUser = {
        id: "mockUserId",
        email: "test@example.com",
        save: jest.fn().mockResolvedValueOnce(true),
        apiKey: "mockApiKey",
      };
      (User.findOne as jest.Mock).mockResolvedValueOnce(mockUser);

      const response = await request(app)
        .get("/api/v1/horoscope/secure-api-key-data?birthdate=1995-12-15")
        .set("horoscope-api-key", "mockApiKey");

      expect(response.status).toBe(200);
      expect(response.body.sign).toBe("Sagittarius");
      expect(response.body.zodiac).toBe("Pig");
    });

    it("should return 401 without API key", async () => {
      const mockUser = {
        id: "mockUserId",
        email: "test@example.com",
        save: jest.fn().mockResolvedValueOnce(true),
        apiKey: "mockApiKey",
      };
      (User.findOne as jest.Mock).mockResolvedValueOnce(mockUser);
      const response = await request(app).get(
        "/api/v1/horoscope/secure-api-key-data?birthdate=1995-12-15"
      );

      expect(response.status).toBe(401);
      expect(response.body.error).toBe("API key is required");
    });

    it("should return 400 with API key but invalid birthdate", async () => {
      const mockUser = {
        id: "mockUserId",
        email: "test@example.com",
        save: jest.fn().mockResolvedValueOnce(true),
        apiKey: "mockApiKey",
      };
      (User.findOne as jest.Mock).mockResolvedValueOnce(mockUser);
      const response = await request(app)
        .get("/api/v1/horoscope/secure-api-key-data?birthdate=invalid-date")
        .set("horoscope-api-key", "mockApiKey");

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "Invalid birthdate format. Use YYYY-MM-DD."
      );
    });
  });
});
