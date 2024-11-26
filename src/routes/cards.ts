import { Router } from 'express';
import {createCard, getCards, deleteCard, likeCard, dislikeCard} from '../controllers/cards';

const router = Router();

router.get('/', getCards); // GET /cards — возвращает все карточки
router.post('/', createCard); // POST /cards — создаёт карточку
router.put('/:cardId/likes', likeCard); // PUT /cards/:cardId/likes — поставить лайк карточке
router.delete('/:cardId/likes', dislikeCard); // DELETE /cards/:cardId/likes — убрать лайк с карточки
router.delete('/:cardId', deleteCard); // DELETE /cards/:cardId — удаляет карточку по идентификатору

export default router;
