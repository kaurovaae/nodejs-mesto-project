import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  updateUserAvatar,
} from '../controllers/users';

const router = Router();

router.patch('/me/avatar', updateUserAvatar); // PATCH /users/me/avatar — обновляет аватар
router.patch('/me', updateUser); // PATCH /users/me — обновляет профиль
router.get('/:userId', getUser); // GET /users/:userId - возвращает пользователя по _id
router.get('/', getUsers); // GET /users — возвращает всех пользователей
router.post('/', createUser); // POST /users — создаёт пользователя

export default router;
