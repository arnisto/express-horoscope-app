/**
 * Parses a date string into an object containing year, month, and day components.
 *
 * @param {string} birthdate - The date string to parse (any valid date format accepted by Date constructor)
 * @returns {Object} An object containing the parsed date components
 * @property {number} year - The full year (e.g., 2023)
 * @property {number} month - The month number (1-12)
 * @property {number} day - The day of the month (1-31)
 * @throws {Error} Throws an error if the provided date string is invalid
 * @example
 * // returns { year: 2023, month: 12, day: 25 }
 * parseDate('2023-12-25')
 */
export const parseDate = (
  birthdate: string
): { year: number; month: number; day: number } => {
  // Validate the input format explicitly
  const dateRegex = /^\d{4}-(\d{2})-(\d{2})$/;

  const match = birthdate.match(dateRegex);

  if (!match) {
    throw new Error("Invalid birthdate format. Use YYYY-MM-DD.");
  }

  const year = parseInt(birthdate.slice(0, 4), 10);
  const month = parseInt(birthdate.slice(5, 7), 10);
  const day = parseInt(birthdate.slice(8, 10), 10);

  // Check for an invalid leap day
  // NOTE : Date object in JavaScript automatically normalizes invalid dates.
  // For example, if you pass 2019-02-29 to the Date constructor,
  // it becomes 2019-03-01 because February 29 does not exist in 2019
  // for that we need to test if the year is a leap year before using Date
  if (month === 2 && day === 29 && !isLeapYear(year)) {
    throw new Error("Invalid date: February 29 on a non-leap year.");
  }

  // Check for general invalid dates
  const date = new Date(birthdate);
  if (
    isNaN(date.getTime()) ||
    date.getFullYear() !== year ||
    date.getMonth() + 1 !== month ||
    date.getDate() !== day
  ) {
    throw new Error("Invalid date");
  }

  return { year, month, day };
};
/**
 * Determines whether a given year is a leap year.
 *
 * @param {number} year - The year to check (e.g., 2024)
 * @returns {boolean} True if the year is a leap year, false otherwise
 * @description
 * A leap year is defined as:
 * - Years divisible by 4 are leap years
 * - However, years divisible by 100 are not leap years
 * - Unless they are also divisible by 400, then they are leap years
 * @example
 * // returns true
 * isLeapYear(2024)
 * // returns false
 * isLeapYear(2023)
 */
export const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};
