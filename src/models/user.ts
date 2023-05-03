import mongoose from 'mongoose';
import validator from 'validator';

interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: [2, 'введите имя пользователя не менее 2-х символов'],
    maxlength: [30, 'введите имя пользователя не более 30-ти символов'],
  },
  about: {
    type: String,
    minlength: [2, 'введите описание не менее 2-х символов'],
    maxlength: [30, 'введите описание не более 200 символов'],
  },
  avatar: {
    type: String,
    required: true,
  },
  email:{
    type:String,
    required:[true, 'Пропущено обязательное поле - электронная почта'],
    validate: {
      validator: (value:string)=>validator.isEmail(value),
      message: 'неправильный формат электронной почты',
    }
  },
  password:{
    type: String,
    required: [true, 'Пропущено обязательное поле -пароль'],
    select: false,
  }
});

export default mongoose.model<IUser>('user', userSchema);
