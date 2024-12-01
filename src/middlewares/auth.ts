import jwt from 'jsonwebtoken';
import { DEV_JWT_SECRET } from '../consts';
import { Request, Response, NextFunction } from '../Model/Express';
import JwtPayload from '../Model/JwtPayload';
import UnauthorizedError from '../errors/unauthorized-err';

const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const { jwt: token } = req.cookies;

  if (!token) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET as string : DEV_JWT_SECRET,
    );
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload as JwtPayload;

  return next();
};

export default authMiddleware;
