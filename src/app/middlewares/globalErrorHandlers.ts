import { Request, Response, NextFunction } from 'express';

// Error handler function
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export default globalErrorHandler;
