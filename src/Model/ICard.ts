import mongoose from 'mongoose';

type ICard = {
  _id: string;
  name: string;
  link: string;
  owner: mongoose.Schema.Types.ObjectId;
  likes: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
};

export default ICard;
