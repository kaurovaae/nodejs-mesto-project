import { Router } from 'express';
import { createUser, getUsers, getUser, updateUser, updateUserAvatar } from '../controllers/users';

const router = Router();

router.get('/', getUsers); // GET /users — возвращает всех пользователей
router.get('/:userId', getUser); // GET /users/:userId - возвращает пользователя по _id
router.post('/', createUser); // POST /users — создаёт пользователя
router.patch('/me/avatar', updateUserAvatar); // PATCH /users/me/avatar — обновляет аватар
router.patch('/me', updateUser); // PATCH /users/me — обновляет профиль

export default router;
