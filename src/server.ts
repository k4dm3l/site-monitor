import { IServerInitializationContract, IUtilitiesContract } from './shared/interfaces';

const ServerInitialization = ({ utilities }: { utilities: IUtilitiesContract }): IServerInitializationContract => ({
  startServer: ({
    expressApplication, port, logger, environment,
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
      }
    } catch (error) {
      process.on('uncaughtException', () => utilities.handlerFatalException);
      process.on('unhandledRejection', () => utilities.handlerFatalException);

      /** Close DB connections - MongoDB */
      process.on('SIGINT', () => logger.info('Close DB connection PROMISE!!'));
      process.on('SIGTERM', () => logger.info('Close DB connection PROMISE!!'));

      logger.error(error);
    }
  },
});

export default ServerInitialization;
