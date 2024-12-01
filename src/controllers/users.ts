import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import NotFoundError from '../errors/not-found-err';
import BadRequestError from '../errors/bad-request-err';

export const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({});
    return res.send({ data: users });
  } catch (err) {
    return next(err);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const user = await User
      .findById(userId)
      .orFail(() => new NotFoundError('Запрашиваемый пользователь не найден'));

    return res.send({ data: user });
  } catch (err) {
    return next(err);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      name,
      about,
      avatar,
      email,
      password,
    } = req.body;

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });

    return res.status(201).send({ data: user });
  } catch (err) {
    if (err instanceof MongooseError.ValidatorError) {
      return next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
    }
    return next(err);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, about, avatar } = req.body;

    // @ts-ignore
    const userId = req.user._id;
    const user = await User
      .findByIdAndUpdate(
        userId,
        { name, about, avatar },
        { new: true },
      )
      .orFail(() => new NotFoundError('Запрашиваемый пользователь не найден'));

    return res.send({ data: user });
  } catch (err) {
    if (err instanceof MongooseError.ValidatorError) {
      return next(new BadRequestError('Переданы некорректные данные при обновлении пользователя'));
    }
    return next(err);
  }
};

export const updateUserAvatar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { avatar } = req.body;

    // @ts-ignore
    const userId = req.user._id;
    const user = await User
      .findByIdAndUpdate(
        userId,
        { avatar },
        { new: true },
      )
      .orFail(() => new NotFoundError('Запрашиваемый пользователь не найден'));

    return res.send({ data: user });
  } catch (err) {
    if (err instanceof MongooseError.ValidatorError) {
      return next(new BadRequestError('Переданы некорректные данные при обновлении пользователя'));
    }
    return next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, '912c3782f50492ddcb2b9d33191');
    return res
      .cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
      })
      .end();
  } catch (err) {
    return next(err);
  }
};
