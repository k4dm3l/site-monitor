import { RequestHandler, Request, Response } from 'express';

import { IResponseContract, IAlertServiceContract } from '../../../shared/interfaces';

const getAlertsController = ({
  alertService,
  responseFormat,
}: {
  alertService: IAlertServiceContract;
  responseFormat: IResponseContract;
}): RequestHandler => async (
  request: Request,
  response: Response,
): Promise<void> => {
  const alerts = await alertService.getAlerts(response.locals._id);

  responseFormat.formatResponse({
    response,
    status: 200,
    data: alerts,
  });
};

export default getAlertsController;
