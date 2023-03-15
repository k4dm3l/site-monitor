import mongoose from 'mongoose';

import { IGetUserContract } from '../../../shared/interfaces';

import entityError from '../../../shared/enums/entityError';
import levelError from '../../../shared/enums/levelError';
import operationTypeError from '../../../shared/enums/operationTypeError';

import BusinessError from '../../../shared/errors/BusinessError';
import NotFoundError from '../../../shared/errors/NotFoundError';

const getUserFactory = ({
  userModel,
  userPermissionsModel,
}: {
  userModel: mongoose.Model<any>;
  userPermissionsModel: mongoose.Model<any>;
}): IGetUserContract => ({
  getUserById: async (id) => {
    if (!id) {
      throw new BusinessError(`${entityError.USER}-${levelError.SERVICE}-${operationTypeError.GET_DB}: No user ID`);
    }

    const user = await userModel.findById(new mongoose.Types.ObjectId(id), {
      hashPassword: 0,
    }).lean();

    if (!user) {
      throw new NotFoundError(`${entityError.USER}-${levelError.SERVICE}-${operationTypeError.GET_DB}: User with ID ${id} not found`);
    }

    const userPermissions = await userPermissionsModel.aggregate([{
      $match: {
        user: user._id,
      },
    }, {
      $lookup: {
        from: 'permissions',
        localField: 'permission',
        foreignField: '_id',
        as: 'permission',
      },
    }, {
      $unwind: {
        path: '$permission',
      },
    }, {
      $project: {
        active: '$permission.active',
        scope: '$permission.scope',
        permission: '$permission.permission',
      },
    }]);

    return { ...user, permissions: userPermissions };
  },
});

export default getUserFactory;
