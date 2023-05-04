import {Request, Response, NextFunction} from 'express';
import {IHttpException} from '../types';

const errorHandler = (err:IHttpException, _req: Request, res:Response, next: NextFunction)=>{
  const {
    statusCode =500,
    message = 'На сервере произошла ошибка'
  } =err;
  res.status(statusCode).send({message});
  next()
};

export default errorHandler