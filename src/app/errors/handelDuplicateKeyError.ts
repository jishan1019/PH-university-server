import {
  TErrorSource,
  TGenericErrorResponse,
} from '../interface/globalErrorStatus.interface';

const handelDuplicateKeyError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const extractMessage = match && match[1];

  const errorSource: TErrorSource = [
    {
      path: '',
      message: `${extractMessage} is already exists.`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid value',
    errorSource,
  };
};

export default handelDuplicateKeyError;
