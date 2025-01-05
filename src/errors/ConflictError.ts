import HoroscopeError from "./HoroscopeError";

class ConflictError extends HoroscopeError {
  constructor(message = "Conflict occurred") {
    super(message, 409);
  }
}

export default ConflictError;
