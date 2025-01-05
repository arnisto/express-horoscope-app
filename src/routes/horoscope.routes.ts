import { Router } from "express";
import { authenticateAPIKey } from "../middlewares/authenticateAPIKey.middleware";
import { authenticateJWT } from "../middlewares/authenticateJWT.middleware";
import { getHoroscope } from "../controllers/horoscope.controller";
import { validateBirthdate } from "../middlewares/validateBirthdate.middleware";

const horoscopeRouter: Router = Router();

/**
 * @swagger
 * /api/v1/horoscope:
 *   get:
 *     tags:
 *       - Horoscope
 *     summary: Get the zodiac sign based on the birthdate
 *     description: This endpoint returns the zodiac sign for a given birthdate.
 *     version: "1.0.0"
 *     parameters:
 *       - in: query
 *         name: birthdate
 *         required: true
 *         description: The birthdate in YYYY-MM-DD format.
 *         schema:
 *           type: string
 *           format: date
 *           example: '1995-12-15'
 *     responses:
 *       200:
 *         description: Zodiac sign found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - sign
 *                 - zodiac
 *               properties:
 *                 sign:
 *                   type: string
 *                   example: Sagittarius
 *                   description: Western zodiac sign
 *                 zodiac:
 *                   type: string
 *                   example: Goat
 *                   description: Chinese zodiac animal
 *       400:
 *         description: Bad Request - Invalid or missing birthdate
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid birthdate format. Use YYYY-MM-DD."
 */
horoscopeRouter.get("/", validateBirthdate, getHoroscope);

/**
 * @swagger
 * /api/v1/horoscope/secure-data:
 *   get:
 *     tags:
 *       - Horoscope
 *     summary: Get the zodiac sign based on the birthdate (JWT Protected)
 *     description: This endpoint returns the zodiac sign for a given birthdate. Requires JWT authentication.
 *     security:
 *       - bearerAuth: []
 *     version: "1.0.0"
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Bearer token for JWT authentication
 *         schema:
 *           type: string
 *           example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 *       - in: query
 *         name: birthdate
 *         required: true
 *         description: The birthdate in YYYY-MM-DD format.
 *         schema:
 *           type: string
 *           format: date
 *           example: '1995-12-15'
 *     responses:
 *       200:
 *         description: Zodiac sign found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - sign
 *                 - zodiac
 *               properties:
 *                 sign:
 *                   type: string
 *                   example: Sagittarius
 *                   description: Western zodiac sign
 *                 zodiac:
 *                   type: string
 *                   example: Goat
 *                   description: Chinese zodiac animal
 *       401:
 *         description: Unauthorized - Invalid or missing JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 *       400:
 *         description: Bad Request - Invalid or missing birthdate
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid birthdate format. Use YYYY-MM-DD."
 */

horoscopeRouter.get(
  "/secure-data",
  authenticateJWT,
  validateBirthdate,
  getHoroscope
);

/**
 * @swagger
 * /api/v1/horoscope/secure-api-key-data:
 *   get:
 *     tags:
 *       - Horoscope
 *     summary: Get the zodiac sign based on the birthdate (API Key Protected)
 *     description: This endpoint returns the zodiac sign for a given birthdate. Requires API Key authentication.
 *     security:
 *       - apiKey: []
 *     version: "1.0.0"
 *     parameters:
 *       - in: header
 *         name: horoscope-api-key
 *         required: true
 *         description: API Key for authentication
 *         schema:
 *           type: string
 *           example: 'your-api-key-here'
 *       - in: query
 *         name: birthdate
 *         required: true
 *         description: The birthdate in YYYY-MM-DD format.
 *         schema:
 *           type: string
 *           format: date
 *           example: '1995-12-15'
 *     responses:
 *       200:
 *         description: Zodiac sign found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - sign
 *                 - zodiac
 *               properties:
 *                 sign:
 *                   type: string
 *                   example: Sagittarius
 *                   description: Western zodiac sign
 *                 zodiac:
 *                   type: string
 *                   example: Goat
 *                   description: Chinese zodiac animal
 *       401:
 *         description: Unauthorized - Invalid or missing API Key
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid API Key"
 *       400:
 *         description: Bad Request - Invalid or missing birthdate
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid birthdate format. Use YYYY-MM-DD."
 */
horoscopeRouter.get(
  "/secure-api-key-data",
  authenticateAPIKey,
  validateBirthdate,
  getHoroscope
);

export default horoscopeRouter;
