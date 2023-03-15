import { RequestHandler, Request, Response } from 'express';

import { IResponseContract, IAlertServiceContract } from '../../../shared/interfaces';

const getAlertDetailsController = ({
  alertService,
  responseFormat,
}: {
  alertService: IAlertServiceContract;
  responseFormat: IResponseContract;
}): RequestHandler => async (
  request: Request,
  response: Response,
): Promise<void> => {
  const alert = await alertService.getAlertDetails(request.params.id, response.locals._id);

  responseFormat.formatResponse({
    response,
    status: 200,
    data: alert,
  });
};

export default getAlertDetailsController;
