import { IGetUserContract } from './IGetUserContract';
import { ICreateUserContract } from './ICreateUserContract';
import { IUpdateUserPermissionsContract } from './IUpdateUserPermissionsContract';

export interface IUserServiceContract
  extends IGetUserContract, ICreateUserContract, IUpdateUserPermissionsContract {}
