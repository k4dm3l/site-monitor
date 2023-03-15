import joi from 'joi';
import { joiObjectId } from 'ts-joi-objectid';
import { isValidObjectId } from 'mongoose';

const joiOid = joiObjectId(joi);

export const getUserSchema = joi.object().keys({
  id: joiOid().required(),
});

export const createUserSchema = joi.object().keys({
  firstName: joi.string().trim().required(),
  lastName: joi.string().trim().required(),
  email: joi.string().email().trim().required(),
  phoneNumber: joi.string().length(10).regex(/\d+/).trim()
    .required(),
  countryCode: joi.string().regex(/^\+\d{1,3}$/).trim().required(),
  hashPassword: joi.string()
    .min(8)
    // eslint-disable-next-line no-useless-escape
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/)
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*)',
    })
    .required(),
  tosAgreement: joi.boolean(),
});

export const updateUserPermissions = joi.object().keys({
  permissions: joi.array().items(joi.string().pattern(/^[0-9a-fA-F]{24}$/).custom((value, helpers) => {
    if (!isValidObjectId(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  })).min(1),
});
