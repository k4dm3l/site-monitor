import BaseError from './BaseError';
import errors from '../enums/errors';

export default class BusinessError extends BaseError {
  public details?: Record<string, unknown> | undefined;

  public constructor(message: string, details?: Record<string, unknown>) {
    super(message);

    this.name = errors.BUSINESS_ERROR;
    this.details = details || {};
    Object.setPrototypeOf(this, BusinessError.prototype);
  }
}
