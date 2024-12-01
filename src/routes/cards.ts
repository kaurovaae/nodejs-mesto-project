import { Router } from 'express';
import {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards';

const cardsRouter = Router();

// @ts-ignore
cardsRouter.put('/:cardId/likes', likeCard); // поставить лайк карточке
// @ts-ignore
cardsRouter.delete('/:cardId/likes', dislikeCard); // убрать лайк с карточки
// @ts-ignore
cardsRouter.delete('/:cardId', deleteCard); // удалить карточку по идентификатору
// @ts-ignore
cardsRouter.get('/', getCards); // вернуть все карточки
// @ts-ignore
cardsRouter.post('/', createCard); // создать карточку

export default cardsRouter;
