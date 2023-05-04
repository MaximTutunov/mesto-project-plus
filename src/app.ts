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
import {
  validateLoginRequest,
  validateCreateUserRequest,
} from './middlewares/validation';


const { errors } = require('celebrate');
const PORT = 3000;
const MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb';

const app = express();

app.use(express.json());
mongoose.set('runValidators', true);
mongoose.connect(MONGO_URL);

app.use(requestLogger)

app.post('/signin', validateLoginRequest, login);
app.post('/signup', validateCreateUserRequest, createUser);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use(errorLogger);

app.use(errors());
app.use(errorHandler)

app.listen(PORT, () => {});
