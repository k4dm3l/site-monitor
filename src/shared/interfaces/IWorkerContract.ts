import { AxiosRequestConfig } from 'axios';

export interface IWorkerPayload {
  alert: {
    _id: string;
    successCodes: Array<number>;
    active: boolean;
    status: string;
    phoneNumber: string;
    countryCode: string;
  };
  config: AxiosRequestConfig;
}

export interface IWorkerContract {
  processingWorkers: (workerPayload: IWorkerPayload[]) => Promise<any>
}
