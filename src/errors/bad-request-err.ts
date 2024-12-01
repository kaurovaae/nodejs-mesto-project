import { STATUS_CODE } from '../consts';

class BadRequestError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODE.BAD_REQUEST;
  }
}

export default BadRequestError;
