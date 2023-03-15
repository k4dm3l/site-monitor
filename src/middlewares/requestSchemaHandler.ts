import boom from '@hapi/boom';
import joi, { Schema } from 'joi';
import { Request, Response, NextFunction } from 'express';

const validate = (data:any, schema: Schema) => {
  if (!joi.isSchema(schema)) {
    // eslint-disable-next-line no-param-reassign
    schema = joi.object(schema);
  }

  const { error } = schema.validate(data);
  return error;
};

const validateRequestSchema = (
  schema: Schema,
  check: string = 'body',
) => (request: Request, response: Response, next: NextFunction) => {
  const error = validate(request[check as keyof Request], schema);

  // eslint-disable-next-line no-unused-expressions
  error ? next(boom.badData(error.message)) : next();
};

export default validateRequestSchema;
