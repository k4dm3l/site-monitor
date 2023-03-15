import joi from 'joi';

export const getTokenSchema = joi.object().keys({
  email: joi.string().email().trim().required(),
  password: joi.string().trim().required(),
});

export const recoveryPassword = joi.object().keys({
  email: joi.string().email().trim().required(),
});

export const updatePassword = joi.object().keys({
  verificationCode: joi.number().integer().positive().required(),
  newPassword: joi.string()
    .min(8)
    // eslint-disable-next-line no-useless-escape
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/)
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*)',
    })
    .required(),
  confirmationPassword: joi.string()
    .min(8)
    // eslint-disable-next-line no-useless-escape
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/)
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*)',
    })
    .required(),
});
