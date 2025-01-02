// TODO: Implement JWT authentication middleware for secure user authorization
// TODO: Implement comprehensive error handling middleware with logging and monitoring capabilities
// NOTE: Application must be served over HTTPS for production deployment

// NOTE: Caching mechanism not required at the moment as the horoscope package implements memoization via lodash,
// providing optimal performance through function-level result caching

import express, { Application } from "express";

import helmet from "helmet";
import { horoscopeRouter } from "./routes/horoscope.routes";
import rateLimit from "express-rate-limit";
import swaggerSpec from "./config/swagger";
import swaggerUi from "swagger-ui-express";

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
    methods: ["GET"],
  })
);
// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Swagger documentation
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Horoscope routes
app.use("/api/v1/horoscope", horoscopeRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
