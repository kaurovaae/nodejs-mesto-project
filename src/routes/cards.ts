import { Router } from 'express';
import {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards';

const cardsRouter = Router();

cardsRouter.put('/:cardId/likes', likeCard); // поставить лайк карточке
cardsRouter.delete('/:cardId/likes', dislikeCard); // убрать лайк с карточки
cardsRouter.delete('/:cardId', deleteCard); // удалить карточку по идентификатору
cardsRouter.get('/', getCards); // вернуть все карточки
cardsRouter.post('/', createCard); // создать карточку

export default cardsRouter;
