import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import User from '../models/user';
import { ICustomRequest, ITokenData } from '../types';
import { AuthErr, NotFoundErr } from '../errors';

export default async (req: ICustomRequest, _res:Response, next:NextFunction) => {
  const { authorization } = req.headers;
  const { JWT_SECRET = 'dev-secret' } = process.env;

  if (!authorization || !authorization.startsWith('Bearer')) { return next(new AuthErr('Ошибка авторизации  auth.ts 1')); }

  let payload;
  const token = authorization.replace('Bearer ', '');
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return next(new AuthErr('Ошибка авторизации auth.ts 2'));
  }

  req.user = payload as ITokenData;

  try {
    await User.findById(req.user._id).orFail(new NotFoundErr('Пользователь не найден'));
  } catch (error) {
    return next(error);
  }
  return next();
};
