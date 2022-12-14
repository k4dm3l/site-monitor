import BaseError from './BaseError';
import errors from '../enums/errors';

export default class ForbiddenError extends BaseError {
  public response?: any;

  public constructor(message: string, response?: any) {
    super(message);

    this.name = errors.FORBIDDEN_ERROR;
    this.response = response;

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}
