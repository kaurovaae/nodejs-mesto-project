import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import users from './routes/users';
import cards from './routes/cards';

const { PORT = 3001, BASE_PATH = '/' } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  req.user = {
    _id: '67434b984bc46eac922a7bf7'
  };

  next();
});

app.use('/users', users);
app.use('/cards', cards);

// здесь обрабатываем все ошибки
app.use((err: Error & { statusCode: number }, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Произошла ошибка'
        : message
    });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}. Base path is: ${BASE_PATH}`);
})
