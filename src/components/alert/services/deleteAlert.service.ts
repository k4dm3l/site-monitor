import mongoose from 'mongoose';
import { Logger } from 'winston';

import { IDeleteAlertContract } from '../../../shared/interfaces';

import entityError from '../../../shared/enums/entityError';
import levelError from '../../../shared/enums/levelError';
import operationTypeError from '../../../shared/enums/operationTypeError';

import BusinessError from '../../../shared/errors/BusinessError';

const deleteAlertFactory = ({
  alertModel,
  logger,
}: {
  alertModel: mongoose.Model<any>;
  logger: Logger
}): IDeleteAlertContract => ({
  deleteAlert: async (alertId, userId) => {
    const alertExist = await alertModel.findOne({ _id: alertId, user: userId }).lean();

    if (!alertExist) throw new BusinessError(`${entityError.ALERT}-${levelError.SERVICE}-${operationTypeError.DELETE_DB}: Not able to delete alert`);

    await alertModel.findByIdAndDelete(alertId);
    logger.info(`Alert deleted ${alertId} - user: ${userId}`);
  },
});

export default deleteAlertFactory;
