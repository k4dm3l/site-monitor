import { RequestHandler, Request, Response } from 'express';
import { IResponseContract, IAuthenticationServiceContract } from '../../../shared/interfaces';

const updatePasswordController = ({
  authenticationService,
  responseFormat,
}: {
  authenticationService: IAuthenticationServiceContract,
  responseFormat: IResponseContract;
}): RequestHandler => async (
  request: Request,
  response: Response,
): Promise<void> => {
  const { email } = request.params;

  await authenticationService.updatePassword(email, request.body);

  responseFormat.formatResponse({
    response,
    status: 200,
    data: 'User password updated successfuly',
  });
};

export default updatePasswordController;
