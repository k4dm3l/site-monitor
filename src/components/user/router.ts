import { Router, RequestHandler } from 'express';
import asyncHandler from '../../middlewares/asyncHandler';
import verifyToken from '../../middlewares/authenticationHandler';
import validateRequestSchema from '../../middlewares/requestSchemaHandler';
import permissionHandler from '../../middlewares/permissionHandler';

import { createUserSchema, getUserSchema, updateUserPermissions } from '../../schemas/userSchemas';

import Permissions from '../../shared/enums/permissions';
import Scopes from '../../shared/enums/scopes';

const userRouter = ({
  getUserController,
  createUserController,
  updateUserPermissionsController,
}: {
  getUserController: RequestHandler,
  createUserController: RequestHandler,
  updateUserPermissionsController: RequestHandler,
}): Router => {
  const router = Router();

  router.get(
    '/:id',
    verifyToken,
    permissionHandler({
      scope: Scopes.USER,
      permissions: [
        Permissions.USER_GET_DETAILS,
      ],
    }),
    validateRequestSchema(getUserSchema, 'params'),
    asyncHandler(getUserController),
  );

  router.post(
    '/',
    validateRequestSchema(createUserSchema),
    asyncHandler(createUserController),
  );

  router.patch(
    '/:id/permissions',
    verifyToken,
    permissionHandler({
      scope: Scopes.USER,
      permissions: [
        Permissions.USER_UPDATE,
      ],
    }),
    validateRequestSchema(getUserSchema, 'params'),
    validateRequestSchema(updateUserPermissions),
    asyncHandler(updateUserPermissionsController),
  );

  return router;
};

export default userRouter;
