import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import NotFoundError from '../errors/not-found-err';
import BadRequestError from '../errors/bad-request-err';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  User.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }

      res.send({ data: user });
    })
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  // хешируем пароль
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else {
        next(err);
      }
    });
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  // @ts-ignore
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, about, avatar },
    { new: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }

      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении пользователя'));
      } else {
        next(err);
      }
    });
};

export const updateUserAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;

  // @ts-ignore
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { avatar },
    { new: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }

      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении пользователя'));
      } else {
        next(err);
      }
    });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, '912c3782f50492ddcb2b9d33191');

      res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
        })
        .end();
    })
    .catch(next);
};
