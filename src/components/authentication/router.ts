import { Router, RequestHandler } from 'express';
import asyncHandler from '../../middlewares/asyncHandler';
import validateRequestSchema from '../../middlewares/requestSchemaHandler';

import { getTokenSchema, recoveryPassword, updatePassword } from '../../schemas/authenticationSchemas';

const authenticationRouter = ({
  getTokenController,
  recoveryPasswordController,
  updatePasswordController,
}: {
  getTokenController: RequestHandler;
  recoveryPasswordController: RequestHandler;
  updatePasswordController: RequestHandler;
}): Router => {
  const router = Router();

  router.post(
    '/login',
    validateRequestSchema(getTokenSchema),
    asyncHandler(getTokenController),
  );

  router.post(
    '/:email/recovery',
    validateRequestSchema(recoveryPassword, 'params'),
    asyncHandler(recoveryPasswordController),
  );

  router.patch(
    '/:email/update-password',
    validateRequestSchema(recoveryPassword, 'params'),
    validateRequestSchema(updatePassword),
    asyncHandler(updatePasswordController),
  );

  return router;
};

export default authenticationRouter;
