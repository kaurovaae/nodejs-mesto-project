import winston from 'winston';
import expressWinston from 'express-winston';

export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: winston.format.prettyPrint(),
    }),
    new winston.transports.File({
      filename: 'logs/request.log',
    }),
  ],
  format: winston.format.json(),
});

export const errorLogger = expressWinston.errorLogger({
  transports: [
    // new winston.transports.Console({
    //   format: winston.format.prettyPrint(),
    // }),
    new winston.transports.File({
      filename: 'logs/error.log',
    }),
  ],
  format: winston.format.json(),
});
