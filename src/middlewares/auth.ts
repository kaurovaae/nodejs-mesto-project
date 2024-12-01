import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import UnauthorizedError from '../errors/unauthorized-err';
import { AUTH_SALT } from '../consts';

const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, AUTH_SALT);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  // @ts-ignore
  req.user = payload;

  return next();
};

export default authMiddleware;
