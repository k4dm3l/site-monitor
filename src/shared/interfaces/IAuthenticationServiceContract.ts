import { IGetTokenContract } from './IGetTokenContract';
import { IRecoveryPasswordContract } from './IRecoveryPasswordContract';
import { IUpdatePasswordContract } from './IUpdatePasswordContract';

export interface IAuthenticationServiceContract
  extends IGetTokenContract, IRecoveryPasswordContract, IUpdatePasswordContract {}
