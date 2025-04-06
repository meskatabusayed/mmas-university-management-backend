import { NextFunction, Request, Response } from 'express';

import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import status from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(status.UNAUTHORIZED, 'You are Not Authorized');
    }

    const decode = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;
   

    const {role , userId , iat} = decode;
    const user = await User.isUserExisByCustomId(userId);

    if (!user) {
      throw new AppError(status.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted
  
    const isDeleted = user?.isDeleted;
  
    if (isDeleted) {
      throw new AppError(status.FORBIDDEN, 'This user is deleted !');
    }
  
    // checking if the user is blocked
  
    const userStatus = user?.status;
  
    if (userStatus === 'blocked') {
      throw new AppError(status.FORBIDDEN, 'This user is blocked ! !');
    }

    if(user.passwordChangedAt && User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt , iat as number)){

      throw new AppError(status.UNAUTHORIZED, 'You are Not Authorized');
    }
  

  

    if (requiredRoles && !requiredRoles.includes(role.toLowerCase())) {
      throw new AppError(status.UNAUTHORIZED, 'You are Not Authorized');
    }

    req.user = decode as JwtPayload;
    next();
  });
};

export default auth;
