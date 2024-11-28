import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  updateUserAvatar,
} from '../controllers/users';

const usersRouter = Router();

usersRouter.patch('/me/avatar', updateUserAvatar); // обновить аватар
usersRouter.patch('/me', updateUser); // обновить профиль
usersRouter.get('/:userId', getUser); // вернуть пользователя по _id
usersRouter.get('/', getUsers); // вернуть всех пользователей
usersRouter.post('/', createUser); // создать пользователя

export default usersRouter;
