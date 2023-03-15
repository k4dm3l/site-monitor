import { RequestHandler, Request, Response } from 'express';

import { IAuthenticationServiceContract, IResponseContract } from '../../../shared/interfaces';

const getTokenController = ({
  authenticationService,
  responseFormat,
}: {
  authenticationService: IAuthenticationServiceContract,
  responseFormat: IResponseContract
}): RequestHandler => async (
  request: Request,
  response: Response,
): Promise<void> => {
  const { email, password } = request.body;

  const token = await authenticationService.getToken(email, password);

  responseFormat.formatResponse({
    response,
    status: 200,
    data: {
      token,
    },
  });
};

export default getTokenController;
