import express from 'express';
import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import STATUS_CODES from './utils/constants';
import { ICustomRequest } from './types';
import { usersRouter, cardsRouter } from './routes';

const PORT = 3000;
const MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb';

const app = express();

app.use(express.json());

mongoose.connect(MONGO_URL);

app.use((req: ICustomRequest, _res, next) => {
  req.user = {
    _id: '644fa9d3349470c8c792bc6f',
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
/*app.use('/', (req: Request, res: Response,next: NextFunction)=>{next(new Error(`${STATUS_CODES.NOT_FOUND} данный адрес не существует`))
});*/
app.use('/', (req: Request, res: Response, next: NextFunction)=>{res.status(404).send({ message: 'Запрашиваемый ресурс не найден' })})

console.log(PORT)
app.listen(PORT);
