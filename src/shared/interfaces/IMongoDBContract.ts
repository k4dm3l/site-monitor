import { ConnectOptions } from 'mongoose';

export interface IMongoDBContract {
  connectMongoDB: ({
    connectionURL,
    options,
  }: {
    connectionURL: string,
    options?: ConnectOptions
  }) => Promise<void>;
  closeMongoDBConnection : () => Promise<void>;
  closeMongoDBConnectionCrashNodeProcess : () => void
}
