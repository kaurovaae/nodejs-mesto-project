import { Error as MongooseError } from 'mongoose';
import { NextFunction, Request, Response } from '../Model/Express';
import Card from '../models/card';
import { STATUS_CODE } from '../consts';
import NotFoundError from '../errors/not-found-err';
import BadRequestError from '../errors/bad-request-err';

export const getCards = async (_req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const cards = await Card.find({});
    return res.send({ data: cards });
  } catch (err) {
    return next(err);
  }
};

export const deleteCard = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { cardId } = req.params;

    const userId = req.user?._id;
    await Card
      .findOneAndDelete({ $and: [{ owner: userId }, { _id: cardId }] })
      .orFail(() => new NotFoundError('Запрашиваемая карточка не найдена'));

    return res.send({ data: { message: 'Карточка успешно удалена' } });
  } catch (err) {
    return next(err);
  }
};

export const createCard = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { name, link } = req.body;

    const userId = req.user?._id;
    const card = await Card.create({ name, link, owner: userId });

    return res.status(STATUS_CODE.CREATED).send({ data: card });
  } catch (err) {
    if (err instanceof MongooseError.ValidatorError) {
      return next(new BadRequestError('Переданы некорректные данные при создании карточки'));
    }
    return next(err);
  }
};

export const likeCard = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const userId = req.user?._id;
    const card = await Card
      .findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: userId } }, // добавить _id в массив, если его там нет
        { new: true },
      )
      .orFail(() => new NotFoundError('Запрашиваемая карточка не найдена'));

    return res.send({ data: card });
  } catch (err) {
    if (err instanceof MongooseError.ValidatorError) {
      return next(new BadRequestError('Переданы некорректные данные для постановки лайка'));
    }
    return next(err);
  }
};

export const dislikeCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const userId = req.user?._id;
    const card = await Card
      .findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: userId } }, // убрать _id из массива
        { new: true },
      )
      .orFail(() => new NotFoundError('Запрашиваемая карточка не найдена'));

    return res.send({ data: card });
  } catch (err) {
    if (err instanceof MongooseError.ValidatorError) {
      return next(new BadRequestError('Переданы некорректные данные для снятия лайка'));
    }
    return next(err);
  }
};
