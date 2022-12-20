import mongoose from 'mongoose';
import { Logger } from 'winston';
import boom from '@hapi/boom';

import { ICreateUserContract } from '../../../shared/interfaces';

import entityError from '../../../shared/enums/entityError';
import levelError from '../../../shared/enums/levelError';
import operationTypeError from '../../../shared/enums/operationTypeError';

const createUserFactory = ({
  userModel,
  logger,
}: {
  userModel: mongoose.Model<any>;
  logger: Logger;
}): ICreateUserContract => ({
  createUser: async (newUser) => {
    const createdUser = await userModel.create({ ...newUser });

    if (!createdUser) {
      logger.error(`${entityError.USER}-${levelError.SERVICE}-${operationTypeError.GET_DB}: Not able to create new user`);
      throw boom.internal(`${entityError.USER}-${levelError.SERVICE}-${operationTypeError.GET_DB}: Not able to create new user`);
    }

    return createdUser._doc;
  },
});

export default createUserFactory;
