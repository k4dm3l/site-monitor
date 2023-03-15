import { RequestHandler, Request, Response } from 'express';
import { IResponseContract, IAuthenticationServiceContract } from '../../../shared/interfaces';

const recoveryPasswordController = ({
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

  await authenticationService.recoveryPassword(email);

  responseFormat.formatResponse({
    response,
    status: 200,
    data: 'Verification code was sent',
  });
};

export default recoveryPasswordController;
