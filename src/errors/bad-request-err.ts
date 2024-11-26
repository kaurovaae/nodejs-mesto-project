class BadRequestError extends Error {
  private statusCode;

  constructor(public message: string) {
    super(message);
    this.statusCode = 400
  }
}

export default BadRequestError;
