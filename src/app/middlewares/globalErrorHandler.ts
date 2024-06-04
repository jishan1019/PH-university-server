import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/globalErrorStatus.interface';
import config from '../config';
import handelZodError from '../errors/handelZodError';
import handelMongooseError from '../errors/handelMongooseError';
import handelCastError from '../errors/handelCastError';
import handelDuplicateKeyError from '../errors/handelDuplicateKeyError';
import AppError from '../errors/AppError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //default status code
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'Internal Server Error',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handelZodError(err);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handelMongooseError(err);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handelCastError(err);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  } else if (err?.code == 11000) {
    const simplifiedError = handelDuplicateKeyError(err);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSource = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSource = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message: message,
    errorSource,
    stack: config.node_env === 'development' ? err?.stack : '',
  });
};

export default globalErrorHandler;
