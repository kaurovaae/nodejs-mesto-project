import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import User from '../models/user';
import { STATUS_CODE, ALREADY_EXISTS_CODE } from '../consts';
import BadRequestError from '../errors/bad-request-err';
import ConflictError from '../errors/conflict-err';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { JWT_SECRET } = process.env;
    const { email, password } = req.body;

    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign(
      { _id: user._id },
      JWT_SECRET,
    );
    return res
      .cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      })
      .end();
  } catch (err) {
    return next(err);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
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

    return res.status(STATUS_CODE.CREATED).send({ data: user });
  } catch (err) {
    if (err instanceof Error && err.message.includes(ALREADY_EXISTS_CODE)) {
      return next(new ConflictError('Пользователь с таким email уже существует'));
    }
    if (err instanceof MongooseError.ValidatorError) {
      return next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
    }
    return next(err);
  }
};
