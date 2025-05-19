import { Response } from 'express';

export const sendSuccess = (
  res: Response,
  data: any,
  message = 'Success',
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
  });
};

export const sendError = (
  res: Response,
  error: any,
  message = 'Something went wrong',
  statusCode = 500
) => {
  return res.status(statusCode).json({
    success: false,
    error: {
      message,
      details:
        process.env.NODE_ENV === 'development' ? error?.toString() : undefined,
    },
  });
};
