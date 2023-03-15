import { Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom';

const permissionHandler = ({
  scope,
  permissions,
}: {
  scope: string,
  permissions?: Array<string>,
}) => (request: Request, response: Response, next: NextFunction) => {
  if (!response.locals.permissions || !response.locals.permissions.length) {
    next(boom.forbidden('No valid scope'));
  }

  const hasValidScope = response.locals.permissions.some(
    (permission: any) => permission.scope === scope,
  );

  if (!hasValidScope) {
    next(boom.forbidden('No valid scope'));
  }

  if (permissions?.length) {
    const hasValidPermissions = permissions.every(
      (permission) => response.locals.permissions.map(
        (userPermission: any) => userPermission.permission,
      ).includes(permission),
    );

    if (!hasValidPermissions) {
      next(boom.forbidden('No valid permissions'));
    }
  }

  next();
};

export default permissionHandler;
