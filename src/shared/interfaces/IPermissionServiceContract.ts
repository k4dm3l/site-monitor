import { ICreatePermissionContract } from './ICreatePermissionContract';
import { IGetPermissionsContract } from './IGetPermissionsContract';

export interface IPermissionServiceContract
  extends ICreatePermissionContract, IGetPermissionsContract {}
