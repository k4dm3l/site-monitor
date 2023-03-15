import mongoose from 'mongoose';

import { ICreateUserContract, ICryptContract } from '../../../shared/interfaces';

import entityError from '../../../shared/enums/entityError';
import levelError from '../../../shared/enums/levelError';
import operationTypeError from '../../../shared/enums/operationTypeError';

import ServerError from '../../../shared/errors/BusinessError';
import BusinessError from '../../../shared/errors/BusinessError';

const createUserFactory = ({
  userModel,
  crypt,
}: {
  userModel: mongoose.Model<any>;
  crypt: ICryptContract;
}): ICreateUserContract => ({
  createUser: async (newUser) => {
    const hashPassword = await crypt.hashPassword(newUser.hashPassword);
    const userExist = await userModel.findOne({ email: newUser.email });

    if (userExist) throw new BusinessError(`${entityError.USER}-${levelError.SERVICE}-${operationTypeError.GET_DB}: Not able to create new user`);

    const createdUser = await userModel.create({ ...newUser, hashPassword });

    if (!createdUser) throw new ServerError(`${entityError.USER}-${levelError.SERVICE}-${operationTypeError.GET_DB}: Not able to create new user`);

    return createdUser._doc;
  },
});

export default createUserFactory;
