import mongoose from 'mongoose';

import { IGetPermissionsContract } from '../../../shared/interfaces';

import entityError from '../../../shared/enums/entityError';
import levelError from '../../../shared/enums/levelError';
import operationTypeError from '../../../shared/enums/operationTypeError';

import NotFoundError from '../../../shared/errors/NotFoundError';

const getPermissionsFactory = ({
  permissionModel,
}: {
  permissionModel: mongoose.Model<any>
}): IGetPermissionsContract => ({
  getPermissions: async () => {
    const permissions = await permissionModel.find();

    if (!permissions) throw new NotFoundError(`${entityError.USER}-${levelError.SERVICE}-${operationTypeError.GET_DB}: Not able to retrieve permissions`);

    return permissions;
  },
});

export default getPermissionsFactory;
