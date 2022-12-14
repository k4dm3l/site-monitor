import BaseError from './BaseError';
import errors from '../enums/errors';

export default class NotFoundError extends BaseError {
  public response?: any;

  public constructor(message: string, response?: any) {
    super(message);

    this.name = errors.NOT_FOUND_ERROR;
    this.response = response;

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
