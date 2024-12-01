import jwt from 'jsonwebtoken';
import { AUTH_SALT } from '../consts';
import { Request, Response, NextFunction } from '../Model/Express';
import IUser from '../Model/IUser';
import UnauthorizedError from '../errors/unauthorized-err';

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

  req.user = payload as IUser;

  return next();
};

export default authMiddleware;
