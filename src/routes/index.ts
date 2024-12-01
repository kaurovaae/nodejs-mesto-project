import { Router } from 'express';
import authRouter from './auth';
import usersRouter from './users';
import cardsRouter from './cards';

const router = Router();

router.use('/', authRouter);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

export default router;
