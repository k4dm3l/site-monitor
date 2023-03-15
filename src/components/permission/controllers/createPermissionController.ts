import { RequestHandler, Request, Response } from 'express';

import { IResponseContract, IPermissionServiceContract } from '../../../shared/interfaces';

const createPermissionController = ({
  permissionService,
  responseFormat,
}: {
  permissionService: IPermissionServiceContract;
  responseFormat: IResponseContract;
}): RequestHandler => async (
  request: Request,
  response: Response,
): Promise<void> => {
  const newPermission = await permissionService.createPermission(request.body);

  responseFormat.formatResponse({
    response,
    status: 200,
    data: newPermission,
  });
};

export default createPermissionController;
