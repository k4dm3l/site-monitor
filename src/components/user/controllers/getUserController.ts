import { RequestHandler, Request, Response } from 'express';
import { errorFormatter } from '../../../middlewares/errorHandler';

import { IUserServiceContract } from '../../../shared/interfaces';

const getUserController = ({
  userService,
}: {
  userService: IUserServiceContract
}): RequestHandler => async (
  request: Request,
  response: Response,
): Promise<void> => {
  try {
    const user = await userService.getUserById(request.params.id);

    response.status(200).json({
      status: 200,
      data: { ...user },
    });
  } catch (error) {
    throw errorFormatter(error);
  }
};

export default getUserController;
