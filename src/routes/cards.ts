import { Router } from 'express';
import { Joi, celebrate } from 'celebrate';
import {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards';
import { LINK_REGEX } from '../consts';

const cardsRouter = Router();

// поставить лайк карточке
cardsRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), likeCard);

// убрать лайк с карточки
cardsRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), dislikeCard);

// удалить карточку по идентификатору
cardsRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), deleteCard);

// вернуть все карточки
cardsRouter.get('/', getCards);

// создать карточку
cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(LINK_REGEX),
  }),
}), createCard);

export default cardsRouter;
