import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: Error & { statusCode: number },
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction,
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
