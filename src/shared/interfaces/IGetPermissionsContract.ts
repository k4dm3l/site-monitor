import { Document } from 'mongoose';

export interface IGetPermissionsContract {
  getPermissions: () => Promise<Document[]>
}
