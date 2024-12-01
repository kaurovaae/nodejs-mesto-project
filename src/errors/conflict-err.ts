import { STATUS_CODE } from '../consts';

class ConflictError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODE.CONFLICT;
  }
}

export default ConflictError;
