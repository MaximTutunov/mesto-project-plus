import { TJoiHelpersObject } from '../types';
import { urlValidation } from '../utils/helpers';

const {celebrate, Joi} = require('celebrate');
const {ObjectId} = require('mongoose').Types;

export const validateCreateCardRequest = celebrate({
  body: Joi.object().keys({
    name:Joi.string().required().min(2).max(30).messages({
      'string.min': 'Название изображения должно содержать не менее 2 символов',
        'string.max': 'Название изображения должно содержать не более 30 символов',
        'any.required': 'Обязательное поле',
    }),
    link: Joi.string().required().custom((value:string, helpers:TJoiHelpersObject)=>{
      if(urlValidation(value)){
        return value
      }
      return helpers.message('Неправильный формат ссылки на изображение');
      })
      .messages({
        'any.required': 'Обязательное поле',
      }),
    })
  })


export const validateUserIdParam = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      })
      .custom((value: string, helpers: TJoiHelpersObject) => {
        if (ObjectId.isValid(value)) {
          return value;
        }

        return helpers.message('Невалидный id пользователя');
      }),
  }),
});

export const validateCardIdParam = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      })
      .custom((value: string, helpers: TJoiHelpersObject) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Невалидный id карточки');
      }),
  }),
});

export const validateLoginRequest = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.email': 'Неправильный формат электронной почты',
        'any.required': 'Обязательное поле',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
  }),
});

export const validateCreateUserRequest = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Имя пользователя должно содержать не менее 2 символов',
        'string.max': 'Имя пользователя должно содержать не более 30 символов',
      }),
    about: Joi.string().min(2).max(200)
      .messages({
        'string.min': 'Описание должно содержать не менее 2 символов',
        'string.max': 'Описание должно содержать не более 200 символов',
      }),
    avatar: Joi.string()
      .custom((value: string, helpers: TJoiHelpersObject) => {
        if (urlValidation(value)) {
          return value;
        }
        return helpers.message('Неправильный формат ссылки на аватар пользователя');
      }),
    email: Joi.string().required().email()
      .messages({
        'string.email': 'Неправильный формат электронной почты',
        'any.required': 'Обязательное поле',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
  }),
});

export const validateUpdateProfileRequest = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Имя пользователя должно содержать не менее 2 символов',
        'string.max': 'Имя пользователя должно содержать не более 30 символов',
        'any.required': 'Обязательное поле',
      }),
    about: Joi.string().required().min(2).max(200)
      .messages({
        'string.min': 'Описание пользователя должно содержать не менее 2 символов',
        'string.max': 'Описание пользователя должно содержать не более 200 символов',
        'any.required': 'Обязательное поле',
      }),
  }),
});

export const validateUpdateAvatarRequest = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      })
      .custom((value: string, helpers: TJoiHelpersObject) => {
        if (urlValidation(value)) {
          return value;
        }
        return helpers.message('Неправильный формат ссылки на аватар пользователя');
      }),
  }),
});