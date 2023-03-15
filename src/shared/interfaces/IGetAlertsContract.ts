import { Document } from 'mongoose';

export interface IGetAlertsContract {
  getAlerts: (userId: string) => Promise<Document[]>
}
