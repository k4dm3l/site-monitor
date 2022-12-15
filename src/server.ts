import { IServerInitializationContract, IUtilitiesContract, IMongoDBContract } from './shared/interfaces';

const ServerInitialization = ({
  utilities,
  mongoDB,
}: {
  utilities: IUtilitiesContract,
  mongoDB: IMongoDBContract
}): IServerInitializationContract => ({
  startServer: async ({
    expressApplication,
    port,
    logger,
    environment,
    dbConnectionString,
    dbConnectionOptions,
  }) => {
    try {
      const normalizedPort = utilities.normalizePort(port);

      if (!normalizedPort) {
        throw new Error('Invalid port');
      } else {
        expressApplication.listen(normalizedPort, () => {
          logger.info(`Environment ${environment}`);
          logger.info(`Server running on http://localhost:${port}`);
        });

        await mongoDB.connectMongoDB({
          connectionURL: dbConnectionString,
          options: dbConnectionOptions,
        });
      }
    } catch (error) {
      process.on('uncaughtException', () => utilities.handlerFatalException);
      process.on('unhandledRejection', () => utilities.handlerFatalException);

      /** Close DB connections - MongoDB */
      process.on('SIGINT', () => mongoDB.closeMongoDBConnectionCrashNodeProcess);
      process.on('SIGTERM', () => mongoDB.closeMongoDBConnectionCrashNodeProcess);

      logger.error(error);
    }
  },
});

export default ServerInitialization;
