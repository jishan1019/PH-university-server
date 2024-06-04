import mongoose from 'mongoose';
import { TErrorSource } from '../interface/globalErrorStatus.interface';

const handelMongooseError = (err: mongoose.Error.ValidationError) => {
  const errorSource: TErrorSource = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSource,
  };
};

export default handelMongooseError;
