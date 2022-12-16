import { Application } from 'express';
import { Logger } from 'winston';
import { ConnectOptions } from 'mongoose';

export interface IServerInitializationContract {
  startServer: ({
    expressApplication,
    port,
    logger,
    environment,
    mongoDBConnectionString,
    mongoDBConnectionOptions,
    redisDBConnectionString,
  }: {
    expressApplication: Application,
    port: string,
    logger: Logger,
    environment:string,
    mongoDBConnectionString: string,
    mongoDBConnectionOptions?: ConnectOptions
    redisDBConnectionString?: string
  }) => Promise<void>
}
