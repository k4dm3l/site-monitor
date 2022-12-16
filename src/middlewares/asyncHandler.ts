import { Request, Response, NextFunction } from 'express';

const asyncHandler = (
  fn:any,
) => (
  request:Request,
  response: Response,
  next:NextFunction,
) => Promise.resolve(fn(request, response, next)).catch(next);

export default asyncHandler;
