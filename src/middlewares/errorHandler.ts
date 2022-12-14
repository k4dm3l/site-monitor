import boom from '@hapi/boom';
import { Request, Response, NextFunction } from 'express';

import env from '../configs';
import logger from '../libs/logger';

const withErrorStack = (error: any, stack: any) => {
  if (env.ENVIRONMENT !== 'PRODUCTION') {
    return { error, stack };
  }

  return error;
};

const notFoundErrorHandler = (request: Request, response: Response) => {
  const { output: { statusCode, payload } } = boom.notFound();

  response.status(statusCode).json(payload);
};

const logError = (error:any, request: Request, response: Response, next: NextFunction) => {
  logger.error(error);

  if (error.isBoom) {
    response.status(error.output.statusCode).json({
      error: true,
      message: error.output.payload.message,
    });
  } else {
    response.status(500).json({
      error: true,
      message: error.message || 'Internal server error',
    });
  }
};

export {
  withErrorStack,
  notFoundErrorHandler,
  logError,
};
