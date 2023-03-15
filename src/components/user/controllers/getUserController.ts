import { RequestHandler, Request, Response } from 'express';

import { IUserServiceContract, IResponseContract } from '../../../shared/interfaces';

const getUserController = ({
  userService,
  responseFormat,
}: {
  userService: IUserServiceContract
  responseFormat: IResponseContract
}): RequestHandler => async (
  request: Request,
  response: Response,
): Promise<void> => {
  const user = await userService.getUserById(request.params.id);

  responseFormat.formatResponse({
    response,
    status: 200,
    data: { ...user },
  });
};

export default getUserController;
