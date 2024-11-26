class NotFoundError extends Error {
  private statusCode;

  constructor(public message: string) {
    super(message);
    this.statusCode = 404;
  }
}

export default NotFoundError;
