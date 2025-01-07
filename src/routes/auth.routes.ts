import {
  generateApiKey,
  login,
  registerNewUser,
} from "../controllers/auth.controller";

import express from "express";
import { validateBody } from "express-joi-validations";
import { authenticateJWT } from "../middlewares/authenticateJWT.middleware";
import { loginValidator } from "../validators/loginValidator";
import { registerValidator } from "../validators/registerValidator";

const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     description: Create a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 description: User's password (min 6 characters)
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Invalid input
 *       409:
 *         description: Email already exists
 */
authRouter.post("/register", validateBody(registerValidator), registerNewUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login user
 *     description: Authenticate user and get JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       401:
 *         description: Invalid credentials
 */
authRouter.post("/login", validateBody(loginValidator), login);

/**
 * @swagger
 * /auth/generate-api-key:
 *   post:
 *     tags: [Auth]
 *     summary: Generate API key
 *     description: Generate a new API key for authenticated user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Bearer token for authentication
 *         schema:
 *           type: string
 *           example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: API key generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 apiKey:
 *                   type: string
 *                   description: Generated API key
 *                 keyName:
 *                   type: string
 *                   description: Name of the API key
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid input
 */

authRouter.post("/generate-api-key", authenticateJWT, generateApiKey);

export default authRouter;
