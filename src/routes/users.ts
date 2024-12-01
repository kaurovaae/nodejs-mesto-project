import { Router } from 'express';
import {
  getUsers,
  getUser,
  getUserInfo,
  updateUser,
  updateUserAvatar,
} from '../controllers/users';

const usersRouter = Router();

// @ts-ignore
usersRouter.patch('/me/avatar', updateUserAvatar); // обновить аватар
// @ts-ignore
usersRouter.patch('/me', updateUser); // обновить профиль
// @ts-ignore
usersRouter.get('/me', getUserInfo); // возвращает информацию о текущем пользователе
// @ts-ignore
usersRouter.get('/:userId', getUser); // вернуть пользователя по _id
// @ts-ignore
usersRouter.get('/', getUsers); // вернуть всех пользователей

export default usersRouter;
