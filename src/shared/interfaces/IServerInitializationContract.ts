import { Application } from 'express';
import { Logger } from 'winston';
import { ConnectOptions } from 'mongoose';

export interface IServerInitializationContract {
  startServer: ({
    expressApplication, port, logger, environment, dbConnectionString, dbConnectionOptions,
  }: {
    expressApplication: Application,
    port: string,
    logger: Logger,
    environment:string,
    dbConnectionString: string,
    dbConnectionOptions?: ConnectOptions
  }) => Promise<void>
}
