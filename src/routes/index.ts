import { Router } from 'express';
import authRouter from './auth';
import usersRouter from './users';
import cardsRouter from './cards';
import auth from '../middlewares/auth';
import { Request, Response, NextFunction } from '../Model/Express';
import NotFoundError from '../errors/not-found-err';

const router = Router();

router.use('/', authRouter);
router.use(auth);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use('*', (_req: Request, _res: Response, next: NextFunction) => {
  return next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

export default router;
