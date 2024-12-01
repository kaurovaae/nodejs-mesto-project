import { Request as ERequest } from 'express';
import IUser from './IUser';

export type Request = {
  user?: IUser;
} & ERequest;

export { NextFunction, Response } from 'express';
