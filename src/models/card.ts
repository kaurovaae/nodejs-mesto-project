import mongoose from 'mongoose';
import { LINK_REGEX } from '../consts';

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
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" — 2'],
    maxlength: [30, 'Максимальная длина поля "name" — 30'],
  },
  link: {
    type: String,
    required: [true, 'Поле "link" должно быть заполнено'],
    validate: {
      validator(value: string): boolean {
        return LINK_REGEX.test(value);
      },
      message: 'Некорректное значение поля "link"',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле "owner" должно быть заполнено'],
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    required: [true, 'Поле "likes" должно быть заполнено'],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
}, {
  versionKey: false,
  timestamps: true,
});

export default mongoose.model<ICard>('card', cardSchema);
