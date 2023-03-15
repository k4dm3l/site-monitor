import mongoose from 'mongoose';

import { IGetAlertsContract } from '../../../shared/interfaces';

import entityError from '../../../shared/enums/entityError';
import levelError from '../../../shared/enums/levelError';
import operationTypeError from '../../../shared/enums/operationTypeError';

import NotFoundError from '../../../shared/errors/NotFoundError';

const getAlertsFactory = ({
  alertModel,
}: {
  alertModel: mongoose.Model<any>;
}): IGetAlertsContract => ({
  getAlerts: async (userId) => {
    const userAlerts = await alertModel.find({ user: userId }, {
      _id: 1,
      name: 1,
      status: 1,
      createdAt: 1,
    });

    if (!userAlerts.length) throw new NotFoundError(`${entityError.ALERT}-${levelError.SERVICE}-${operationTypeError.INSERT_DB}: Alerts not found.`);

    return userAlerts;
  },
});

export default getAlertsFactory;
