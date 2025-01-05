import { Request, Response } from "express";

import { birthdateValidator } from "../validators/birthdateValidator";
import { getHoroscopeService } from "../services/horoscope.service";

/**
 * Controller to get both Western zodiac sign and Chinese zodiac based on birthdate
 * @param req Express request object containing birthdate in query params
 * @param res Express response object
 * @returns JSON response with zodiac information or error message
 */
export const getHoroscope = (req: Request, res: Response): void => {
  const { birthdate } = req.query;

  try {
    const { error } = birthdateValidator.validate({ birthdate });
    if (error) {
      throw new Error(error.details[0].message);
    }
    // Use the service to get the zodiac details
    const { sign, zodiac } = getHoroscopeService(birthdate as string);

    res.status(200).json({ sign, zodiac });
  } catch (error) {
    console.error("Error in getHoroscope:", error);

    res.status(400).json({
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
    });
  }
};
