import { Request, Response, NextFunction } from 'express';
import { ICustomRequest, IMongooseError } from '../types';
import STATUS_CODES from '../utils/constants';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
  NotFoundErr,
  AuthErr,
  ConflictErr,
} from '../errors';

export const getUsers = async (_req: Request, res: Response, next:NextFunction) => {
  try {
    const users = await User.find({});
    return res.status(STATUS_CODES.OK).send(users);
  } catch (error){
    return next(error);
  }
};

export const getCurrentUser = async (req: ICustomRequest, res: Response, next: NextFunction,) => {
 const userId = req.user?._id;

  try {
    const user = await User.findById(userId).orFail(new NotFoundErr('Пользователь не найден'));
    return res.status(STATUS_CODES.OK).send(user);
  } catch (error){
    return next(error)
  }
};


export const login = async (req: Request, res: Response, next:NextFunction) =>{
  const{ email, password } = req.body;
  const {JWT_SECRET = 'dev-secret'} =process.env;

  try{
    const user = await User.findOne({email}).select('+password');
    if(!user) {
      throw new AuthErr('Необходима авторизация')
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if(!isMatched){
      throw new AuthErr('Необходима авторизация')
    }
    return res.send({
      token: jwt.sign({_id:user._id}, JWT_SECRET,{expiresIn:'7d'})
    })


  }catch (error){
    return next(error)
  }
  }

export const createUser = async (req: Request, res: Response, next:NextFunction) => {
  const { name, about, avatar, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    await User.create({ name, about, avatar,email, password: hash });
    const userData= await User.findOne({email});
    return res.status(STATUS_CODES.OK).send(userData);

  } catch (error) {
    const {code} = error as IMongooseError;
    if (code && code ===11000) {return next(new ConflictErr('Пользователь с таким email уже существует'))
    }
    return next(error)
  }
  };

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).orFail(new NotFoundErr('Пользователь не найден'));

    return res.status(STATUS_CODES.OK).send(user);
  } catch (error) {
    return next(error)
  }
  };

export const updateProfile = async (req: ICustomRequest, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  const userId = req.user?._id;
  try {
     const user = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true },
    ).orFail(new NotFoundErr('Пользователь не найден'));

    return res.status(STATUS_CODES.OK).send(user);
  } catch (error) {
    return next(error)
  }
};

export const updateAvatar = async (req: ICustomRequest, res: Response,  next: NextFunction) => {
  const { avatar } = req.body;
  const userId = req.user?._id;
  try {
    if (!userId) {
      throw new Error('Пользователя с данным id не существует');
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true },
    ).orFail(new NotFoundErr('Пользователь не найден'));

    return res.status(STATUS_CODES.OK).send(user);
  } catch (error) {
    return next(error)
  }
};
