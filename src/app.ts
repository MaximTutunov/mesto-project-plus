import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import { ICustomRequest } from './types';
import { usersRouter, cardsRouter } from './routes';
import STATUS_CODES from './utils/constants';

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
app.use('/', (req: Request, res: Response) => { res.status(STATUS_CODES.NOT_FOUND).send({ message: 'Запрашиваемый ресурс не найден' }); });

app.listen(PORT);
