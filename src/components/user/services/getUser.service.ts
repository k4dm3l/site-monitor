import mongoose from 'mongoose';
import { Logger } from 'winston';

import { IGetUserContract } from '../../../shared/interfaces';

import entityError from '../../../shared/enums/entityError';
import levelError from '../../../shared/enums/levelError';
import operationTypeError from '../../../shared/enums/operationTypeError';

import BusinessError from '../../../shared/errors/BusinessError';
import NotFoundError from '../../../shared/errors/NotFoundError';

const getUserFactory = ({
  userModel,
  logger,
}: {
  userModel: mongoose.Model<any>;
  logger: Logger;
}): IGetUserContract => ({
  getUserById: async (id) => {
    if (!id) {
      throw new BusinessError(`${entityError.USER}-${levelError.SERVICE}-${operationTypeError.GET_DB}: No user ID`);
    }

    const user = await userModel.findById(new mongoose.Types.ObjectId(id)).lean();

    if (!user) {
      throw new NotFoundError(`${entityError.USER}-${levelError.SERVICE}-${operationTypeError.GET_DB}: User with ID ${id} not found`);
    }

    return user;
  },
});

export default getUserFactory;
