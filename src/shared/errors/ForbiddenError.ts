import BaseError from './BaseError';
import ErrorEnum from '../enums/errors';

export default class ForbiddenError extends BaseError {
  public response?: any;

  public constructor(message: string, response?: any) {
    super(message);

    this.name = ErrorEnum.FORBIDDEN_ERROR;
    this.response = response;

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}
