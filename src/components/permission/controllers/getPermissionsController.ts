import { RequestHandler, Request, Response } from 'express';

import { IResponseContract, IPermissionServiceContract } from '../../../shared/interfaces';

const getPermissionsController = ({
  permissionService,
  responseFormat,
}: {
  permissionService: IPermissionServiceContract;
  responseFormat: IResponseContract;
}): RequestHandler => async (
  request: Request,
  response: Response,
): Promise<void> => {
  const permissions = await permissionService.getPermissions();

  responseFormat.formatResponse({
    response,
    status: 200,
    data: permissions,
  });
};

export default getPermissionsController;
