import { AxiosResponse } from 'axios';

export interface ITwilioIntegrationContract {
  sendSMS: (to: string, message: string) => Promise<AxiosResponse>
}
