import mongoose from 'mongoose';
import { Logger } from 'winston';

import createAlertFactory from './createAlert.service';
import deleteAlertFactory from './deleteAlert.service';
import getAlertDetailsFactory from './getAlertDetails.service';
import getAlertsFactory from './getAlerts.service';

import { IAlertServiceContract } from '../../../shared/interfaces';

const alertService = ({
  alertModel,
  logger,
}: {
  alertModel: mongoose.Model<any>;
  logger: Logger
}): IAlertServiceContract => {
  const { createAlert } = createAlertFactory({
    alertModel,
    logger,
  });

  const { deleteAlert } = deleteAlertFactory({
    alertModel,
    logger,
  });

  const { getAlertDetails } = getAlertDetailsFactory({
    alertModel,
  });

  const { getAlerts } = getAlertsFactory({
    alertModel,
  });

  return {
    createAlert,
    deleteAlert,
    getAlertDetails,
    getAlerts,
  };
};

export default alertService;
