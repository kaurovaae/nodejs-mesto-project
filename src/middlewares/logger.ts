import winston from 'winston';
import expressWinston from 'express-winston';

// создадим логер запросов
export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({
      filename: 'logs/request.log',
    }),
  ],
  format: winston.format.json(),
});

// логер ошибок
export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
    }),
  ],
  format: winston.format.json(),
});
