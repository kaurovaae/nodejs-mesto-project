import { Router } from 'express';
import { Joi, celebrate } from 'celebrate';
import { login, createUser } from '../controllers/auth';

const authRouter = Router();

// авторизовать пользователя
authRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), login);

// создать пользователя
authRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), createUser);

export default authRouter;
