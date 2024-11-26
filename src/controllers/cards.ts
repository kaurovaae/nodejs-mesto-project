import {NextFunction, Request, Response} from 'express';
import Card from '../models/card';

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then(users => res.send({ data: users }))
    .catch(next);
}

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete({ _id: cardId })
    .then(card => res.send({ data: { message: 'Карточка успешно удалена' } }))
    .catch(next);
}

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;

  // @ts-ignore
  const userId = req.user._id;
  Card.create({ name, link, owner: userId })
    .then(card => res.send({ data: card }))
    .catch(next);
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const userId = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: userId } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then(card => res.send({ data: card }))
    .catch(next);
}

export const dislikeCard = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: userId } }, // убрать _id из массива
    { new: true }
  )
    .then(card => res.send({ data: card }))
    .catch(next);
}

