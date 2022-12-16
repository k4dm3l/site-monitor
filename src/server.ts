import {
  IServerInitializationContract, IUtilitiesContract, IMongoDBContract, IRedisDBContract,
} from './shared/interfaces';

const ServerInitialization = ({
  utilities,
  mongoDB,
  redisDB,
}: {
  utilities: IUtilitiesContract;
  mongoDB: IMongoDBContract;
  redisDB: IRedisDBContract;
}): IServerInitializationContract => ({
  startServer: async ({
    expressApplication,
    port,
    logger,
    environment,
    mongoDBConnectionString,
    mongoDBConnectionOptions,
    redisDBConnectionString,
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

        if (redisDBConnectionString) {
          await redisDB.connectRedisDB(redisDBConnectionString);
        }

        await mongoDB.connectMongoDB({
          connectionURL: mongoDBConnectionString,
          options: mongoDBConnectionOptions,
        });
      }
    } catch (error) {
      process.on('uncaughtException', () => utilities.handlerFatalException);
      process.on('unhandledRejection', () => utilities.handlerFatalException);

      /** Close DB connections - MongoDB */
      process.on('SIGINT', () => mongoDB.closeMongoDBConnectionCrashNodeProcess);
      process.on('SIGTERM', () => mongoDB.closeMongoDBConnectionCrashNodeProcess);
    }
  },
});

export default ServerInitialization;
