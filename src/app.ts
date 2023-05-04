import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import { ICustomRequest } from './types';
import { usersRouter, cardsRouter } from './routes';
import STATUS_CODES from './utils/constants';
import {
  login, createUser
} from './controllers/users';
import auth from './middlewares/auth';
import winston from 'winston';
import expressWinston from 'express-winston';
import { requestLogger, errorLogger } from './middlewares/logger';
import errorHandler from './middlewares/error-handler';


const { errors } = require('celebrate');
const PORT = 3000;
const MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb';

const app = express();

app.use(express.json());

mongoose.connect(MONGO_URL);

app.use(requestLogger)

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use(errorLogger);

app.use(errors());
app.use(errorHandler)

/*app.use('/', (req: Request, res: Response) => { res.status(STATUS_CODES.NOT_FOUND).send({ message: 'Запрашиваемый ресурс не найден' }); });*/

app.listen(PORT, () => {});
