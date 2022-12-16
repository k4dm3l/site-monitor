import UserDocument from '../types/user';

export interface ITokenContract {
  generateToken: (userData: Partial<UserDocument>) => string
}
