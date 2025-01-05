class HoroscopeError extends Error {
  public readonly status: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.status = statusCode;
  }
}

export default HoroscopeError;
