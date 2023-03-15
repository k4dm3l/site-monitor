import mongoose from 'mongoose';

import { IGetTokenContract, ICryptContract, ITokenContract } from '../../../shared/interfaces';

import entityError from '../../../shared/enums/entityError';
import levelError from '../../../shared/enums/levelError';
import operationTypeError from '../../../shared/enums/operationTypeError';

import BusinessError from '../../../shared/errors/BusinessError';
import ForbiddenError from '../../../shared/errors/ForbiddenError';

const getTokenFactory = ({
  userModel,
  userPermissionModel,
  crypt,
  token,
}: {
  userModel: mongoose.Model<any>;
  userPermissionModel: mongoose.Model<any>;
  crypt: ICryptContract;
  token: ITokenContract;
}): IGetTokenContract => ({
  getToken: async (email, password) => {
    if (!email || !password) {
      throw new BusinessError(`${entityError.USER}-${levelError.SERVICE}-${operationTypeError.GET_DB}: No username or password`);
    }

    const user = await userModel.findOne({ email }).lean();

    if (!user || !user.active) {
      throw new ForbiddenError(`${entityError.USER}-${levelError.SERVICE}: Invalid user`);
    }

    const validPassword = await crypt.comparePassword(password, user.hashPassword);

    if (!validPassword) {
      throw new ForbiddenError(`${entityError.USER}-${levelError.SERVICE}: Invalid user`);
    }

    const userPermissions = await userPermissionModel.aggregate([{
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
        _id: 0,
        active: '$permission.active',
        scope: '$permission.scope',
        permission: '$permission.permission',
      },
    }]);

    return token.generateToken({ ...user, permissions: userPermissions });
  },
});

export default getTokenFactory;
