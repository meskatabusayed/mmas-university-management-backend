import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

interface JwtPayloadType {
  userId: string;
  role: string;
}

export const createToken = (
  jwtPayload: JwtPayloadType,
  secret: string,
  expiresIn: string
): string => {
  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions['expiresIn'], 
  };

  return jwt.sign(jwtPayload, secret, options);
};

export const verifyToken = (
  token: string,
  secret: string
): JwtPayload | string => {
  return jwt.verify(token, secret);
};


