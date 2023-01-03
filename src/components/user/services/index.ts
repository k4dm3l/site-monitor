import mongoose from 'mongoose';

import getUserFactory from './getUser.service';
import createUserFactory from './createUser.service';

import { IUserServiceContract, ICryptContract } from '../../../shared/interfaces';

const userService = ({
  userModel,
  crypt,
}: {
  userModel: mongoose.Model<any>;
  crypt: ICryptContract
}): IUserServiceContract => {
  const { getUserById } = getUserFactory({ userModel });
  const { createUser } = createUserFactory({ userModel, crypt });

  return {
    getUserById,
    createUser,
  };
};

export default userService;
