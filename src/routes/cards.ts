import { Router } from 'express';
import { Joi, celebrate } from 'celebrate';
import {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards';

const cardsRouter = Router();

// поставить лайк карточке
cardsRouter.put('/:cardId/likes', likeCard);

// убрать лайк с карточки
cardsRouter.delete('/:cardId/likes', dislikeCard);

// удалить карточку по идентификатору
cardsRouter.delete('/:cardId', deleteCard);

// вернуть все карточки
cardsRouter.get('/', getCards);

// создать карточку
cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), createCard);

export default cardsRouter;
