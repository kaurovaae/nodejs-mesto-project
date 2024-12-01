import {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import { STATUS_CODE } from '../consts';

const errorHandler: ErrorRequestHandler = (
  err: Error & { statusCode: number },
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { statusCode = STATUS_CODE.ERROR, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === STATUS_CODE.ERROR
        ? 'Произошла ошибка'
        : message,
    });
};

export default errorHandler;
