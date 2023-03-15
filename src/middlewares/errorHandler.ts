import boom from '@hapi/boom';
import {
  Request, Response, NextFunction, Application,
} from 'express';

import env from '../configs';
import logger from '../libs/logger';

import BusinessError from '../shared/errors/BusinessError';
import NotFoundError from '../shared/errors/NotFoundError';
import ForbiddenError from '../shared/errors/ForbiddenError';
import ServerError from '../shared/errors/ServerError';

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

const errorFormatter = (error:any) => {
  let boomFormattedError;

  logger.error(error.message);

  if (error instanceof BusinessError) {
    boomFormattedError = boom.badRequest(error.message);
  } else if (error instanceof NotFoundError) {
    boomFormattedError = boom.notFound(error.message);
  } else if (error instanceof ForbiddenError) {
    boomFormattedError = boom.forbidden(error.message);
  } else if (error instanceof ServerError) {
    boomFormattedError = boom.internal(error.message);
  } else {
    boomFormattedError = boom.internal('Internal server error');
    /** Add Sentry loggin process HERE */
  }

  return boomFormattedError;
};

const logError = (error:any, request: Request, response: Response, next: NextFunction) => {
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
  errorFormatter,
};
