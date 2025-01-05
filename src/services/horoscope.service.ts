import { parseDate } from "../utils/date.util";

const horoscope = require("horoscope");

/**
 * Service to get both Western zodiac sign and Chinese zodiac based on birthdate
 * @param birthdate The birthdate as a string in YYYY-MM-DD format
 * @returns An object containing the Western zodiac sign and Chinese zodiac animal
 * @throws Error if the birthdate format is invalid
 */
export const getHoroscopeService = (
  birthdate: string
): { sign: string; zodiac: string } => {
  // Parse the birthdate string into year, month, and day components
  const { year, month, day } = parseDate(birthdate);

  // Get Western zodiac sign based on month and day
  const sign = horoscope.getSign({ month, day });
  // Get Chinese zodiac animal based on year
  const zodiac = horoscope.getZodiac(year);

  return { sign, zodiac };
};
