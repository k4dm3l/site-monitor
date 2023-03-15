import mongoose from 'mongoose';

import { IUpdateUserPermissionsContract } from '../../../shared/interfaces';

const updateUserPermissionFactory = ({
  userPermissionsModel,
}: {
  userPermissionsModel: mongoose.Model<any>
}): IUpdateUserPermissionsContract => ({
  updateUserPermission: async (user, permissions) => {
    const result: Array<{
    user: string,
    permission: string,
    message: string
    error: boolean
  }> = [];
    await Promise.all(permissions.map(async (permission) => {
      try {
        const permissionAlreadyAssigned = await userPermissionsModel.findOne({
          user: new mongoose.Types.ObjectId(user),
          permission: new mongoose.Types.ObjectId(permission),
        }).lean();

        if (!permissionAlreadyAssigned) {
          const storedUserPermission = await userPermissionsModel.create({ user, permission });
          result.push({
            user: storedUserPermission.user,
            permission: storedUserPermission.permission,
            error: false,
            message: '',
          });
          return;
        }

        result.push({
          user, permission, error: true, message: 'Already Assigned',
        });
      } catch (error) {
        result.push({
          user, permission, error: true, message: `${error}`,
        });
      }
    }));

    return result;
  },
});

export default updateUserPermissionFactory;
