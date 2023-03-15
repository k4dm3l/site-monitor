import { Document } from 'mongoose';
import Alert from '../types/alert';

export interface ICreateAlertContract {
  createAlert: (userId:string, newAlert: Alert) => Promise<Document>
}
