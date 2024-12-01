import {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';

const errorHandler: ErrorRequestHandler = (
  err: Error & { statusCode: number },
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Произошла ошибка'
        : message,
    });
};

export default errorHandler;
