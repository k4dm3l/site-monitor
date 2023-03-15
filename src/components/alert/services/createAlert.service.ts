import mongoose from 'mongoose';
import { Logger } from 'winston';

import { ICreateAlertContract } from '../../../shared/interfaces';

import entityError from '../../../shared/enums/entityError';
import levelError from '../../../shared/enums/levelError';
import operationTypeError from '../../../shared/enums/operationTypeError';

import ServerError from '../../../shared/errors/ServerError';
import BusinessError from '../../../shared/errors/BusinessError';

const createAlertFactory = ({
  alertModel,
  logger,
}: {
  alertModel: mongoose.Model<any>;
  logger: Logger
}): ICreateAlertContract => ({
  createAlert: async (userId, newAlert) => {
    const alertsQtyPerUser = await alertModel.countDocuments({ user: userId });

    if (alertsQtyPerUser >= 5) throw new BusinessError(`${entityError.ALERT}-${levelError.SERVICE}-${operationTypeError.INSERT_DB}: This user has already reached the maximum limit of alerts created.`);

    const createdAlert = await alertModel.create({
      ...newAlert,
      active: true,
      user: new mongoose.Types.ObjectId(userId),
    });

    if (!createdAlert) throw new ServerError(`${entityError.ALERT}-${levelError.SERVICE}-${operationTypeError.INSERT_DB}: Not able to create new alert`);

    logger.info(`New alert created - ${createdAlert._doc._id} - user: ${userId}`);
    return createdAlert._doc;
  },
});

export default createAlertFactory;
