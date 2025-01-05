import HoroscopeError from "./HoroscopeError";

class NotFoundError extends HoroscopeError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

export default NotFoundError;
