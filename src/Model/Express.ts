import { Request as ERequest } from 'express';
import JwtPayload from './JwtPayload';

export type Request = {
  user?: JwtPayload;
} & ERequest;

export { NextFunction, Response } from 'express';
