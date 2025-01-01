import express from "express";
import { horoscopeRouter } from "../routes/horoscope.routes";
import request from "supertest";

const app = express();
app.use("/api/v1/horoscope", horoscopeRouter);

describe("Horoscope API", () => {
  it("should return zodiac sign for a valid birthdate", async () => {
    const response = await request(app).get(
      "/api/v1/horoscope?birthdate=1995-12-15"
    );
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
});
