import { Router } from 'express';
import { login, createUser } from '../controllers/auth';

const authRouter = Router();

authRouter.post('/signin', login);
authRouter.post('/signup', createUser);

export default authRouter;
