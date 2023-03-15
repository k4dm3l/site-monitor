import mongoose from 'mongoose';

import { ICreatePermissionContract } from '../../../shared/interfaces';

import entityError from '../../../shared/enums/entityError';
import levelError from '../../../shared/enums/levelError';
import operationTypeError from '../../../shared/enums/operationTypeError';

import ServerError from '../../../shared/errors/BusinessError';

const createPermissionFactory = ({
  permissionModel,
}: {
  permissionModel: mongoose.Model<any>
}): ICreatePermissionContract => ({
  createPermission: async (newPermission) => {
    const createdPermission = await permissionModel.create({ ...newPermission });

    if (!createdPermission) throw new ServerError(`${entityError.USER}-${levelError.SERVICE}-${operationTypeError.INSERT_DB}: Not able to create new permission`);

    return createdPermission._doc;
  },
});

export default createPermissionFactory;
