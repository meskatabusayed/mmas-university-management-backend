import { Request, Response, NextFunction } from 'express';

// Error handler function
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

export default globalErrorHandler;
