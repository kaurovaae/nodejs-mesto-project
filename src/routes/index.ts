import { Router } from 'express';
import authRouter from './auth';
import usersRouter from './users';
import cardsRouter from './cards';
import auth from '../middlewares/auth';

const router = Router();

router.use('/', authRouter);
router.use(auth);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

export default router;
