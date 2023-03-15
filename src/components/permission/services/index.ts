import mongoose from 'mongoose';

import createPermissionFactory from './createPermission.service';
import getPermissionsFactory from './getPermissions.service';

import { IPermissionServiceContract } from '../../../shared/interfaces';

const permissionService = ({
  permissionModel,
}: {
  permissionModel: mongoose.Model<any>
}): IPermissionServiceContract => {
  const { createPermission } = createPermissionFactory({ permissionModel });
  const { getPermissions } = getPermissionsFactory({ permissionModel });

  return {
    createPermission,
    getPermissions,
  };
};

export default permissionService;
