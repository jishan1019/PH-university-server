import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/globalErrorStatus.interface';

const handelZodError = (err: ZodError) => {
  const statusCode = 400;

  const errorSource: TErrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path?.[issue?.path?.length - 1],
      message: issue.message,
    };
  });

  return {
    statusCode,
    message: 'Validation Error',
    errorSource,
  };
};

export default handelZodError;
