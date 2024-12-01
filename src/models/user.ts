import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import validator from 'validator';
import UnauthorizedError from '../errors/unauthorized-err';

interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

interface IUserMethods {}

interface IUserModel extends mongoose.Model<IUser, {}, IUserMethods> {
  findUserByCredentials: (
    _email: string,
    _password: string
  ) => Promise<mongoose.HydratedDocument<IUser, IUserMethods>>,
}

const userSchema = new mongoose.Schema<IUser, IUserModel, IUserMethods>({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина поля "name" — 2'],
    maxlength: [30, 'Максимальная длина поля "name" — 30'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Минимальная длина поля "about" — 2'],
    maxlength: [200, 'Максимальная длина поля "about" — 200'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: true,
    validate: {
      validator(email: string) {
        return validator.isEmail(email);
      },
      message: 'Некорректное значение поля "email"',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    select: false,
  },
});

userSchema.statics
  .findUserByCredentials = async function findUserByCredentials(email: string, password: string) {
    const user = await this.findOne({ email })
      .select('+password')
      .orFail(() => new UnauthorizedError('Неправильные почта или пароль'));

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
    }
    return user;
  };

export default mongoose.model<IUser, IUserModel>('user', userSchema);
