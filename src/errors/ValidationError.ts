import HoroscopeError from "./HoroscopeError";

class ValidationError extends HoroscopeError {
  constructor(message = "Invalid input") {
    super(message, 400);
  }
}

export default ValidationError;
