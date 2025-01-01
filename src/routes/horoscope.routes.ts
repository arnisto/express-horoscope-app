import { Router } from "express";
import { getHoroscope } from "../controllers/horoscope.controller";
import { validateBirthdate } from "../middlewares/validateBirthdate.middleware";

export const horoscopeRouter: Router = Router();

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
