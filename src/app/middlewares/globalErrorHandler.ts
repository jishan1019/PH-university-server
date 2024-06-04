import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/globalErrorStatus.interface';
import config from '../config';
import handelZodError from '../errors/handelZodError';

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

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
  }

  return res.status(statusCode).json({
    success: false,
    message: message,
    errorSource,
    stack: config.node_env === 'development' ? err?.stack : '',
  });
};

export default globalErrorHandler;
