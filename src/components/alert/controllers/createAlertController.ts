import { RequestHandler, Request, Response } from 'express';

import { IResponseContract, IAlertServiceContract } from '../../../shared/interfaces';

const createAlertController = ({
  alertService,
  responseFormat,
}: {
  alertService: IAlertServiceContract;
  responseFormat: IResponseContract;
}): RequestHandler => async (
  request: Request,
  response: Response,
): Promise<void> => {
  const newAlert = await alertService.createAlert(response.locals._id, request.body);

  responseFormat.formatResponse({
    response,
    status: 200,
    data: newAlert,
  });
};

export default createAlertController;
