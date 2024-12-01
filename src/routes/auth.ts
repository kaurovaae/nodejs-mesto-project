import { Router } from 'express';
import { login, createUser } from '../controllers/auth';

const authRouter = Router();

// @ts-ignore
authRouter.post('/signin', login);
// @ts-ignore
authRouter.post('/signup', createUser);

export default authRouter;
