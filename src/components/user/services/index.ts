import mongoose from 'mongoose';

import getUserFactory from './getUser.service';
import createUserFactory from './createUser.service';

import { IUserServiceContract } from '../../../shared/interfaces';

const userService = ({
  userModel,
}: {
  userModel: mongoose.Model<any>;
}): IUserServiceContract => {
  const { getUserById } = getUserFactory({ userModel });
  const { createUser } = createUserFactory({ userModel });

  return {
    getUserById,
    createUser,
  };
};

export default userService;
