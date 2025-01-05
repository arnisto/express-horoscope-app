import { NextFunction, Request, Response } from "express";

import { parseDate } from "../utils/date.util";

/**
 * Middleware to validate birthdate query parameter
 * @description Validates that the birthdate query parameter is present and in the correct format (YYYY-MM-DD)
 * @param {Request} req - Express request object containing query parameters
 * @param {Response} res - Express response object for sending HTTP responses
 * @param {NextFunction} next - Express next function to pass control to the next middleware
 * @returns {void | Response} Returns HTTP 400 response if validation fails, otherwise continues to next middleware
 * @throws {Error} Throws error if date parsing fails
 */
export function validateBirthdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { birthdate } = req.query;

  if (!birthdate || typeof birthdate !== "string") {
    res.status(400).json({ error: "Birthdate query parameter is required." });
    return;
  }

  try {
    // Try to parse the birthdate using the parseDate function
    parseDate(birthdate);

    // If valid, continue to the next handler
    next();
  } catch (error) {
    if (error instanceof Error) {
      // If parseDate throws an error
      res.status(400).json({
        error: error.message || "Invalid birthdate format. Use YYYY-MM-DD.",
      });
      return;
    }
    // Generic error handling
    res.status(400).json({
      error: "Invalid birthdate format. Use YYYY-MM-DD.",
    });
    return;
  }
}
