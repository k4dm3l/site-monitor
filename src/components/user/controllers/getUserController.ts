import { RequestHandler, Request, Response } from 'express';

import { IUserServiceContract } from '../../../shared/interfaces';

const getUserController = ({
  userService,
}: {
  userService: IUserServiceContract
}): RequestHandler => async (
  request: Request,
  response: Response,
): Promise<void> => {
  const user = await userService.getUserById(request.params.id);

  response.status(200).json({
    status: 200,
    data: { ...user },
  });
};

export default getUserController;
