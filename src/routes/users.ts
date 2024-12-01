import { Router } from 'express';
import { Joi, celebrate } from 'celebrate';
import {
  getUsers,
  getUser,
  getUserInfo,
  updateUser,
  updateUserAvatar,
} from '../controllers/users';

const usersRouter = Router();

// обновить аватар
usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), updateUserAvatar);

// обновить профиль
usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string(),
  }),
}), updateUser);

// вернуть информацию о текущем пользователе
usersRouter.get('/me', getUserInfo);

// вернуть пользователя по _id
usersRouter.get('/:userId', getUser);

// вернуть всех пользователей
usersRouter.get('/', getUsers);

export default usersRouter;
