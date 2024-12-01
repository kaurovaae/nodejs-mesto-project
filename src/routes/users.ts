import { Router } from 'express';
import {
  getUsers,
  getUser,
  getUserInfo,
  updateUser,
  updateUserAvatar,
} from '../controllers/users';

const usersRouter = Router();

usersRouter.patch('/me/avatar', updateUserAvatar); // обновить аватар
usersRouter.patch('/me', updateUser); // обновить профиль
usersRouter.get('/me', getUserInfo); // возвращает информацию о текущем пользователе
usersRouter.get('/:userId', getUser); // вернуть пользователя по _id
usersRouter.get('/', getUsers); // вернуть всех пользователей

export default usersRouter;
