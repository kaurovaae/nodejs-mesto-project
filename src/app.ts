import express from 'express';
import rateLimit from 'express-rate-limit';
import { errors } from 'celebrate';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import routes from './routes';
import errorHandler from './middlewares/errorHandler';
import { requestLogger, errorLogger } from './middlewares/logger';

dotenv.config();

const { PORT = 3000, DB_ADDRESS } = process.env;

const app = express();

app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

app.use(limiter);

mongoose.connect(DB_ADDRESS);

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(requestLogger);
app.use(routes);
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[server] App listening on port ${PORT}`);
});
