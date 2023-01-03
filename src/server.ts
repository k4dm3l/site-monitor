import { Router } from 'express';
import {
  IServerInitializationContract, IUtilitiesContract, IMongoDBContract, IRedisDBContract,
} from './shared/interfaces';
import { notFoundErrorHandler, logError } from './middlewares/errorHandler';

/** Models */
import UserModel from './models/user';

/** Services */
import userServiceFactory from './components/user/services';

/** Controllers */
import getUserController from './components/user/controllers/getUserController';
import createUserController from './components/user/controllers/createUserController';

/** Routers */
import userRouter from './components/user/router';

/** Utilities */
import Crypt from './libs/crypt';

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
        /** Utilities */
        const crypt = Crypt();

        /** Services initialization */
        const userService = userServiceFactory({ userModel: UserModel, crypt });

        /** Controllers initialization */
        const getUser = getUserController({ userService });
        const createUser = createUserController({ userService });

        /** Routes */
        const router = Router();
        expressApplication.use('/user', userRouter({
          router,
          getUserController: getUser,
          createUserController: createUser,
        }));

        /** Not Found Error Handler */
        expressApplication.use(notFoundErrorHandler);

        /** Error Handler - Logger */
        expressApplication.use(logError);

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
