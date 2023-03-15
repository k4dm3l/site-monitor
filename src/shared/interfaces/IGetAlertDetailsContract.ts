import { Document } from 'mongoose';

export interface IGetAlertDetailsContract {
  getAlertDetails: (alertId: string, userId: string) => Promise<Document | null>
}
