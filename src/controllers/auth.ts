import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import User from '../models/user';
import BadRequestError from '../errors/bad-request-err';

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
