import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Card from '../models/card';
import { ICustomRequest } from '../types';
import STATUS_CODES from '../utils/constants';
import user from 'models/user';

export const getCards = async (_req: Request, res: Response) => {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);
    return res.status(STATUS_CODES.OK).send(cards);
  } catch {
    return res
      .status(STATUS_CODES.DEFAULT_ERROR)
      .send({ message: 'Ошибка на сервере' });
  }
};

export const createCard = async (req: ICustomRequest, res: Response) => {
  const { name, link } = req.body;
  const userId = req.user?._id;
  try {
    const card = await Card.create({ name, link, owner: userId });
    return res.status(STATUS_CODES.OK).send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send({ message: 'Неверные данные при обновлении профиля' });
    }
    return res
    .status(STATUS_CODES.DEFAULT_ERROR)
    .send({ message: 'Ошибка сервера' });
  }
};

export const deleteCard = async (req: ICustomRequest, res: Response, next:NextFunction) => {
  const { cardId } = req.params;
  const userId = req.user?._id;
  try {
    const card = await Card.findById(cardId).populate({path:'owner', match:{_id:userId}}).orFail(new NotFoundError('Карточка с таким id не найдена'));

    if (!card.owner) {

      throw new ForbiddenError('Карточка с таким id принадлежит другому пользователю');
    }

   await Card.findByIdAndDelete(cardId)

    return res.status(STATUS_CODES.OK).send({ message: 'Карточка удалена' });
  } catch (error) {
    return next(error)
  }
};

export const addLikeToCard = async (req: ICustomRequest, res: Response) => {
  const { cardId } = req.params;
  const userId = req.user?._id;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    );

    if (!card) {
      const error = new Error('карточка с данным Id отстутствует');
      error.name = 'CardNotFound';
      throw error;
    }
    return res.status(STATUS_CODES.OK).send(card);
  } catch (error) {
    if (error instanceof Error && error.name === 'CastError') {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send({ message: '_id карточки некорректный' });
    }
    if (error instanceof Error && error.name === 'CardNotFound') {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .send({ message: 'карточка с данным Id не существует' });
    }
    return res
      .status(STATUS_CODES.DEFAULT_ERROR)
      .send({ message: 'ошибка сервера' });
  }
};

export const deleteLikeFromCard = async (
  req: ICustomRequest,
  res: Response,
) => {
  const { cardId } = req.params;
  const userId = req.user?._id as unknown as mongoose.Schema.Types.ObjectId;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    );

    if (!card) {
      const error = new Error('карточка с данным Id отстутствует');
      error.name = 'CardNotFound';
      throw error;
    }
    return res.status(STATUS_CODES.OK).send(card);
  } catch (error) {
    if (error instanceof Error && error.name === 'CastError') {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send({ message: '_id карточки некорректный' });
    }

    if (error instanceof Error && error.name === 'CardNotFound') {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .send({ message: 'карточка с данным Id не существует' });
    }

    return res
      .status(STATUS_CODES.DEFAULT_ERROR)
      .send({ message: 'ошибка сервера' });
  }
};
