import { parseDate } from "../utils/date.util";

describe("parseDate", () => {
  test("parses a valid date string in YYYY-MM-DD format", () => {
    const birthdate = "2000-05-15";
    const result = parseDate(birthdate);
    expect(result).toEqual({ year: 2000, month: 5, day: 15 });
  });

  test("throws an error for an Invalid birthdate format. Use YYYY-MM-DD. string", () => {
    const birthdate = "invalid-date";
    expect(() => parseDate(birthdate)).toThrow(
      "Invalid birthdate format. Use YYYY-MM-DD."
    );
  });

  test("parses a leap year date", () => {
    const birthdate = "2020-02-29";
    const result = parseDate(birthdate);
    expect(result).toEqual({ year: 2020, month: 2, day: 29 });
  });

  test("throws an error for an invalid leap year date", () => {
    const birthdate = "2019-02-29";
    expect(() => parseDate(birthdate)).toThrow(
      "Invalid date: February 29 on a non-leap year."
    );
  });

  test("parses a valid date with single-digit month and day", () => {
    const birthdate = "1999-01-01";
    const result = parseDate(birthdate);
    expect(result).toEqual({ year: 1999, month: 1, day: 1 });
  });

  test("throws an error for a date string missing parts", () => {
    const birthdate = "2020-05";
    expect(() => parseDate(birthdate)).toThrow(
      "Invalid birthdate format. Use YYYY-MM-DD."
    );
  });

  test("throws an error for an empty date string", () => {
    const birthdate = "";
    expect(() => parseDate(birthdate)).toThrow(
      "Invalid birthdate format. Use YYYY-MM-DD."
    );
  });

  test("parses a date at the end of the year", () => {
    const birthdate = "2023-12-31";
    const result = parseDate(birthdate);
    expect(result).toEqual({ year: 2023, month: 12, day: 31 });
  });

  test("parses a date at the beginning of the year", () => {
    const birthdate = "2023-01-01";
    const result = parseDate(birthdate);
    expect(result).toEqual({ year: 2023, month: 1, day: 1 });
  });

  test("throws an error for a date string with invalid separators", () => {
    const birthdate = "2020/05/15";
    expect(() => parseDate(birthdate)).toThrow(
      "Invalid birthdate format. Use YYYY-MM-DD."
    );
  });

  test("throws an error for a date with non-numeric characters", () => {
    const birthdate = "202a-05-15";
    expect(() => parseDate(birthdate)).toThrow(
      "Invalid birthdate format. Use YYYY-MM-DD."
    );
  });

  test("parses a date with leading zeros in month and day", () => {
    const birthdate = "1999-04-07";
    const result = parseDate(birthdate);
    expect(result).toEqual({ year: 1999, month: 4, day: 7 });
  });

  test("throws an error for a date with negative year", () => {
    const birthdate = "-2020-05-15";
    expect(() => parseDate(birthdate)).toThrow(
      "Invalid birthdate format. Use YYYY-MM-DD."
    );
  });

  test("parses a date with a future year", () => {
    const birthdate = "2100-11-11";
    const result = parseDate(birthdate);
    expect(result).toEqual({ year: 2100, month: 11, day: 11 });
  });

  test("throws an error for a date string with trailing characters", () => {
    const birthdate = "2000-05-15abc";
    expect(() => parseDate(birthdate)).toThrow(
      "Invalid birthdate format. Use YYYY-MM-DD."
    );
  });
});
