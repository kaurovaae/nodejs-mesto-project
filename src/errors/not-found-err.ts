import { STATUS_CODE } from '../consts';

class NotFoundError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODE.NOT_FOUND;
  }
}

export default NotFoundError;
