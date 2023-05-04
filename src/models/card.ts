import mongoose from 'mongoose';
import { urlValidation } from '../utils/helpers';

interface ICard {
  name: string;
  link: string;
  owner: mongoose.Schema.Types.ObjectId;
  likes: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
}

const cardSchema = new mongoose.Schema<ICard>({
  name: {
    type: String,
    required: [true, 'Введите обязательное поле - название изображения'],
    minlength: [2, 'введите название изображения не менее 2-х символов'],
    maxlength: [30, 'введите название изображения не более 30-ти символов'],
  },
  link: {
    type: String,
    required: [true, 'Введите обязательное поле - ссылка на изображение'],
    validate: {validator: urlValidation,
    message: 'Неправильный формат ссылки на изображение'}

  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'введите обязательное поле id автора'],
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export default mongoose.model<ICard>('card', cardSchema);
