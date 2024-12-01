import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import errorHandler from './middlewares/errorHandler';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
