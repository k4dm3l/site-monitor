import mongoose from 'mongoose';

import getUserFactory from './getUser.service';
import createUserFactory from './createUser.service';
import updateUserPermissionFactory from './updateUserPermissions.service';

import { IUserServiceContract, ICryptContract } from '../../../shared/interfaces';

const userService = ({
  userModel,
  userPermissionsModel,
  crypt,
}: {
  userModel: mongoose.Model<any>;
  userPermissionsModel: mongoose.Model<any>;
  crypt: ICryptContract;
}): IUserServiceContract => {
  const { getUserById } = getUserFactory({ userModel, userPermissionsModel });
  const { createUser } = createUserFactory({ userModel, crypt });
  const { updateUserPermission } = updateUserPermissionFactory({ userPermissionsModel });

  return {
    getUserById,
    createUser,
    updateUserPermission,
  };
};

export default userService;
