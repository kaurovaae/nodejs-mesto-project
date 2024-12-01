import { STATUS_CODE } from '../consts';

class ForbiddenError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODE.FORBIDDEN;
  }
}

export default ForbiddenError;
