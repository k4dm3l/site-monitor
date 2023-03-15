import joi from 'joi';
import { joiObjectId } from 'ts-joi-objectid';

import Protocols from '../shared/enums/protocols';
import Methods from '../shared/enums/methods';
import AlertStatus from '../shared/enums/alertStatus';

const joiOid = joiObjectId(joi);

export const createAlertSchema = joi.object().keys({
  protocol: joi.string().valid(
    Protocols.HTTP,
    Protocols.HTTPS,
  ).required(),
  method: joi.string().valid(
    Methods.DELETE,
    Methods.GET,
    Methods.PATCH,
    Methods.POST,
    Methods.PUT,
  ).required(),
  url: joi.string().uri().required(),
  name: joi.string().required(),
  successCodes: joi.array().unique().items(joi.number().integer().min(100).max(500)).required(),
  timeoutSeconds: joi.number().integer().min(3).max(10)
    .required(),
  status: joi.string().valid(
    AlertStatus.DOWN,
    AlertStatus.UP,
  ).required(),
});

export const getAlertSchema = joi.object().keys({
  id: joiOid().required(),
});
