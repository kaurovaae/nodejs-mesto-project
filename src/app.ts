import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import errorHandler from './middlewares/errorHandler';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  req.user = {
    _id: '674844dc563eee3241f7ffe6',
  };

  next();
});

app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
