import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface';

const handleDuplicateError = (
  err: any
): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extecdMessage = match && match[1];
  const errorSources: TErrorSources = [
    {
      path: ' ',
      message: `${extecdMessage} is Already Exist!`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleDuplicateError;
