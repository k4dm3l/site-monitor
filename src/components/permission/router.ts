import { Router, RequestHandler } from 'express';
import asyncHandler from '../../middlewares/asyncHandler';
import verifyToken from '../../middlewares/authenticationHandler';
import validateRequestSchema from '../../middlewares/requestSchemaHandler';
import permissionHandler from '../../middlewares/permissionHandler';

import permissionSchema from '../../schemas/permissionSchemas';

import Permissions from '../../shared/enums/permissions';
import Scopes from '../../shared/enums/scopes';

const permissionRouter = ({
  createPermissionController,
  getPermissionsController,
}: {
  createPermissionController: RequestHandler;
  getPermissionsController: RequestHandler;
}): Router => {
  const router = Router();

  router.post(
    '/',
    verifyToken,
    permissionHandler({
      scope: Scopes.PERMISSION,
      permissions: [
        Permissions.PERMISSION_CREATE,
      ],
    }),
    validateRequestSchema(permissionSchema),
    asyncHandler(createPermissionController),
  );

  router.get(
    '/',
    verifyToken,
    permissionHandler({
      scope: Scopes.PERMISSION,
      permissions: [
        Permissions.PERMISSION_LIST,
      ],
    }),
    asyncHandler(getPermissionsController),
  );

  return router;
};

export default permissionRouter;
