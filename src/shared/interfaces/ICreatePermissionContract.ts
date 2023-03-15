import { Document } from 'mongoose';
import Permission from '../types/permission';

export interface ICreatePermissionContract {
  createPermission: (newPermission: Permission) => Promise<Document>
}
