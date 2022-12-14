import { Application } from 'express';
import { Logger } from 'winston';

export interface IServerInitializationContract {
  startServer: ({
    expressApplication, port, logger, environment,
  }: { expressApplication: Application, port: string, logger: Logger, environment:string }) => void
}
