import { IGetUserContract } from './IGetUserContract';
import { ICreateUserContract } from './ICreateUserContract';

export interface IUserServiceContract extends IGetUserContract, ICreateUserContract {}
