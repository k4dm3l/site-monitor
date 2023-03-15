import { RequestHandler, Request, Response } from 'express';

import { IUserServiceContract, IResponseContract } from '../../../shared/interfaces';

const updateUserPermissionsController = ({
  userService,
  responseFormat,
}: {
  userService: IUserServiceContract
  responseFormat: IResponseContract
}): RequestHandler => async (
  request: Request,
  response: Response,
): Promise<void> => {
  const userPermissionsUpdated = await userService.updateUserPermission(
    request.params.id,
    request.body.permissions,
  );

  responseFormat.formatResponse({
    response,
    status: 200,
    data: userPermissionsUpdated,
  });
};

export default updateUserPermissionsController;
