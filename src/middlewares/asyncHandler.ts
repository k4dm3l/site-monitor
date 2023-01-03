import {
  Request, Response, NextFunction, RequestHandler,
} from 'express';
import { errorFormatter } from './errorHandler';

const asyncHandler = (
  fn:RequestHandler,
) => (
  request:Request,
  response: Response,
  next:NextFunction,
) => Promise.resolve(fn(request, response, next)).catch((error) => next(errorFormatter(error)));

export default asyncHandler;
