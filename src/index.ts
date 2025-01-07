// NOTE: Application must be served over HTTPS for production deployment
// NOTE: Caching mechanism not required at the moment as the horoscope package implements memoization via lodash,
// providing optimal performance through function-level result caching
// Future enhancements: support for multiple languages/translations and additional input formats

import express, { Application } from "express";

import rateLimit from "express-rate-limit";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import connectDB from "./config/db";
import swaggerSpec from "./config/swagger";
import authRouter from "./routes/auth.routes";
import horoscopeRouter from "./routes/horoscope.routes";

require("dotenv").config(); // Load environment variables

const path = require("path");

const compression = require("compression");

const cors = require("cors");

const xss = require("xss-clean");

const PORT = 3001;

const app: Application = express();

// Helmet for setting HTTP headers
app.use(helmet());

app.use(compression());

// Sanitize user input to prevent XSS attacks
app.use(xss());

// Rate limiting middleware (allow 100 requests per IP in 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
});

app.use(limiter);

// Enable CORS for specific domains
app.use(
  cors({
    origin: ["http://localhost", "https://express-horoscope-app.onrender.com/"],
    methods: ["GET", "POST"],
  })
);
export default app;
// Middleware to parse incoming JSON requests
app.use(express.json());
connectDB();
// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Swagger documentation
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Auth/user routes
app.use("/api/v1/auth", authRouter);

// Horoscope routes
app.use("/api/v1/horoscope", horoscopeRouter);

// Middleware to catch unhandled routes
app.use((req, res, next) => {
  res.status(404).json({
    status: "404",
    message: `The route ${req.originalUrl} does not exist.`,
  });
});

// Centralized error handler
app.use((err: any, req, res: any) => {
  const status = err.status || 500;
  res.status(status).json({
    error: err.name || "InternalServerError",
    message: err.message || "Something went wrong!",
  });
});

app.listen(PORT, () => {
  console.info(
    `Server is running on : ${
      process.env.BACKEND_URL || "https://express-horoscope-app.onrender.com"
    }`
  );
});
