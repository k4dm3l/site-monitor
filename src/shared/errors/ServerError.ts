import BaseError from './BaseError';
import ErrorEnum from '../enums/errors';

export default class ServerError extends BaseError {
  public details?: Record<string, unknown> | undefined;

  public constructor(message: string, details?: Record<string, unknown>) {
    super(message);

    this.name = ErrorEnum.BUSINESS_ERROR;
    this.details = details || {};

    Object.setPrototypeOf(this, ServerError.prototype);
  }
}
