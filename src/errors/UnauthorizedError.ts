import HoroscopeError from "./HoroscopeError"; // Import the base error class

class UnauthorizedError extends HoroscopeError {
  constructor(message = "Unauthorized access") {
    super(message, 401);
  }
}

export default UnauthorizedError;
