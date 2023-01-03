import { Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom';
import jwt from 'jsonwebtoken';

import env from '../configs';
import UserDocument from '../shared/types/user';

const verifyToken = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const token = request.headers.authorization;

  if (!token) throw boom.unauthorized('No valid authentication');
  if (!token.startsWith('Bearer ')) throw boom.unauthorized('No valid authentication');

  const tokenArray = token.split(' ');

  response.locals = jwt.verify(tokenArray[1], env.JWT_TOKEN_SECRET) as Partial<UserDocument>;

  next();
};

export default verifyToken;
