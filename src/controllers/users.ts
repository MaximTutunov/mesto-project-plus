import { Request, Response } from "express";
import mongoose from "mongoose";
import { ICustomRequest } from "../types";
import STATUS_CODES from "../utils/constants";
import User from "../models/user";

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find({});
    return res.status(STATUS_CODES.OK).send(users);
  } catch {
    return res
      .status(STATUS_CODES.DEFAULT_ERROR)
      .send({ message: "Ошибка сервера" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    return res.status(STATUS_CODES.OK).send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send({ message: "Ошибка при создании пользователя" });
    }
  }
  return res
    .status(STATUS_CODES.DEFAULT_ERROR)
    .send({ message: "Ошибка сервера" });
};

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("Отсутствует пользователь с данным id");
      error.name = "UserNotFound";
      throw error;
    }
    return res.status(STATUS_CODES.OK).send(user);
  } catch (error) {
    if (error instanceof Error && error.name === "UserNotFound") {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .send({ message: "Отсутствует пользователь с данным id" });
    }
  }
  return res
    .status(STATUS_CODES.DEFAULT_ERROR)
    .send({ message: "Ошибка сервера" });
};

export const updateProfile = async (req: ICustomRequest, res: Response) => {
  const { name, about } = req.body;
  const userId = req.user?._id;

  try {
    if (!userId) {
      throw new Error("Пользователя с данным id не существует");
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true }
    );

    if (!user) {
      const error = new Error("Отсутствует пользователь с данным id");
      error.name = "UserNotFound";
      throw error;
    }

    return res.status(STATUS_CODES.OK).send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send({ message: "Ошибка при обновлении профиля" });
    }

    if (error instanceof Error && error.name === "UserNotFound") {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .send({ message: "Отсутствует пользователь с данным id" });
    }
    return res
      .status(STATUS_CODES.DEFAULT_ERROR)
      .send({ message: "Ошибка сервера" });
  }
};

export const updateAvatar = async (req: ICustomRequest, res: Response) => {
  const { avatar } = req.body;
  const userId = req.user?._id;

  try {
    if (!userId) {
      throw new Error("Пользователя с данным id не существует");
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true }
    );

    if (!user) {
      const error = new Error("Отсутствует пользователь с данным id");
      error.name = "UserNotFound";
      throw error;
    }

    return res.status(STATUS_CODES.OK).send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send({ message: "Ошибка при обновлении профиля" });
    }

    if (error instanceof Error && error.name === "UserNotFound") {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .send({ message: "Отсутствует пользователь с данным id" });
    }
    return res
      .status(STATUS_CODES.DEFAULT_ERROR)
      .send({ message: "Ошибка сервера" });
  }
};
