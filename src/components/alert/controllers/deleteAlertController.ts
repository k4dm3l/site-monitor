import { RequestHandler, Request, Response } from 'express';

import { IResponseContract, IAlertServiceContract } from '../../../shared/interfaces';

const deleteAlertController = ({
  alertService,
  responseFormat,
}: {
  alertService: IAlertServiceContract;
  responseFormat: IResponseContract;
}): RequestHandler => async (
  request: Request,
  response: Response,
): Promise<void> => {
  await alertService.deleteAlert(request.params.id, response.locals._id);

  responseFormat.formatResponse({
    response,
    status: 200,
    data: 'Alert deleted successfully',
  });
};

export default deleteAlertController;
