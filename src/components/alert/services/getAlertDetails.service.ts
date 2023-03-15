import mongoose from 'mongoose';

import { IGetAlertDetailsContract } from '../../../shared/interfaces';

import entityError from '../../../shared/enums/entityError';
import levelError from '../../../shared/enums/levelError';
import operationTypeError from '../../../shared/enums/operationTypeError';

import BusinessError from '../../../shared/errors/BusinessError';

const getAlertDetailsFactory = ({
  alertModel,
}: {
  alertModel: mongoose.Model<any>;
}): IGetAlertDetailsContract => ({
  getAlertDetails: async (alertId, userId) => {
    const alert = await alertModel.findOne({ _id: alertId, user: userId });

    if (!alert) throw new BusinessError(`${entityError.ALERT}-${levelError.SERVICE}-${operationTypeError.GET_DB}: Alerts not found.`);

    return alert;
  },
});

export default getAlertDetailsFactory;
