import { Document } from 'mongoose';
import User from '../types/user';

export interface ICreateUserContract {
  createUser: (newUser: User) => Promise<Document>
}
