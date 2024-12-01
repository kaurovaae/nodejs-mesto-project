import { STATUS_CODE } from '../consts';

class UnauthorizedError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODE.UNAUTHORIZED;
  }
}

export default UnauthorizedError;
