import { RequestHandler, Request, Response } from 'express';

import { IUserServiceContract, IResponseContract } from '../../../shared/interfaces';

const createUserController = ({
  userService,
  responseFormat,
}: {
  userService: IUserServiceContract
  responseFormat: IResponseContract
}): RequestHandler => async (
  request: Request,
  response: Response,
): Promise<void> => {
  const user = await userService.createUser(request.body);

  responseFormat.formatResponse({
    response,
    status: 200,
    data: { ...user },
  });
};

export default createUserController;
