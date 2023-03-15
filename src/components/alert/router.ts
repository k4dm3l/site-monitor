import { Router, RequestHandler } from 'express';
import asyncHandler from '../../middlewares/asyncHandler';
import verifyToken from '../../middlewares/authenticationHandler';
import validateRequestSchema from '../../middlewares/requestSchemaHandler';
import permissionHandler from '../../middlewares/permissionHandler';

import { createAlertSchema, getAlertSchema } from '../../schemas/alertSchemas';

import Permissions from '../../shared/enums/permissions';
import Scopes from '../../shared/enums/scopes';

const alertRouter = ({
  createAlertController,
  deleteAlertController,
  getAlertsController,
  getAlertDetailsController,
}: {
  createAlertController: RequestHandler;
  deleteAlertController: RequestHandler;
  getAlertsController: RequestHandler;
  getAlertDetailsController: RequestHandler;
}): Router => {
  const router = Router();

  router.post(
    '/',
    verifyToken,
    permissionHandler({
      scope: Scopes.PERMISSION,
      permissions: [
        Permissions.ALERT_CREATE,
      ],
    }),
    validateRequestSchema(createAlertSchema),
    asyncHandler(createAlertController),
  );

  router.delete(
    '/:id',
    verifyToken,
    permissionHandler({
      scope: Scopes.ALERT,
      permissions: [
        Permissions.ALERT_DELETE,
      ],
    }),
    validateRequestSchema(getAlertSchema, 'params'),
    asyncHandler(deleteAlertController),
  );

  router.get(
    '/:id',
    verifyToken,
    permissionHandler({
      scope: Scopes.ALERT,
    }),
    validateRequestSchema(getAlertSchema, 'params'),
    asyncHandler(getAlertDetailsController),
  );

  router.get(
    '/',
    verifyToken,
    permissionHandler({
      scope: Scopes.ALERT,
    }),
    asyncHandler(getAlertsController),
  );

  return router;
};

export default alertRouter;
