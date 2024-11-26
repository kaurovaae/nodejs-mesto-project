import {NextFunction, Request, Response} from 'express';
import User from '../models/user';
import NotFoundError from '../errors/not-found-err';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(next);
}

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  User.findOne({ _id: userId })
    .then(user => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }

      res.send({ data: user });
    })
    .catch(next);
}

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(next);
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  // @ts-ignore
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, about, avatar },
    { new: true }
  )
    .then(user => res.send({ data: user }))
    .catch(next);
};

export const updateUserAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;

  // @ts-ignore
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { avatar },
    { new: true }
  )
    .then(user => res.send({ data: user }))
    .catch(next);
};

