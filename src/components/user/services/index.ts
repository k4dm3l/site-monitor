import mongoose from 'mongoose';
import { Logger } from 'winston';

import getUserFactory from './getUser.service';
import createUserFactory from './createUser.service';

import { IUserServiceContract } from '../../../shared/interfaces';

const userService = ({
  userModel,
  logger,
}: {
  userModel: mongoose.Model<any>;
  logger: Logger;
}): IUserServiceContract => {
  const { getUserById } = getUserFactory({ userModel, logger });
  const { createUser } = createUserFactory({ userModel, logger });

  return {
    getUserById,
    createUser,
  };
};

export default userService;
