import { Document } from 'mongoose';

export interface IGetUserContract {
  getUserById: (id: string) => Promise<Document | null>
}
