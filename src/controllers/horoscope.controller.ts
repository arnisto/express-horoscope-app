import { Request, Response } from "express";

import { parseDate } from "../utils/date.util";

const horoscope = require("horoscope");

/**
 * Controller to get both Western zodiac sign and Chinese zodiac based on birthdate
 * @param req Express request object containing birthdate in query params
 * @param res Express response object
 * @returns JSON response with zodiac information or error message
 */
export const getHoroscope = (
  req: Request | any,
  res: Response | any
): Response | any => {
  const { birthdate } = req.query;

  try {
    // Parse the birthdate string into year, month, and day components
    const { year, month, day } = parseDate(birthdate);

    // Get Western zodiac sign based on month and day
    const sign = horoscope.getSign({ month, day });
    // Get Chinese zodiac animal based on year
    const zodiac = horoscope.getZodiac(year);

    return res.status(200).json({ sign, zodiac });
  } catch (error) {
    // Handle specific Error instances with their messages
    if (error instanceof Error) {
      return res.status(400).json({
        error: error.message,
      });
    }

    // Handle unknown error types with a generic message
    return res.status(400).json({
      error: "An unexpected error occurred.",
    });
  }
};
