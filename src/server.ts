import cron from 'node-cron';
import * as Sentry from '@sentry/node';
import {
  IServerInitializationContract, IUtilitiesContract, IMongoDBContract, IRedisDBContract,
} from './shared/interfaces';
import { notFoundErrorHandler, logError } from './middlewares/errorHandler';

/** Models */
import UserModel from './models/user';
import UserPermissionsModel from './models/userPermission';
import PermissionModel from './models/permission';
import AlertModel from './models/alert';

/** Services */
import userServiceFactory from './components/user/services';
import authenticationServiceFactory from './components/authentication/services';
import permissionServiceFactory from './components/permission/services';
import alertServiceFactory from './components/alert/services';

/** Controllers */
import getUserController from './components/user/controllers/getUserController';
import createUserController from './components/user/controllers/createUserController';
import updateUserPermissionsController from './components/user/controllers/updateUserPermissionsController';
import createPermissionController from './components/permission/controllers/createPermissionController';
import getPermissionsController from './components/permission/controllers/getPermissionsController';
import getTokenController from './components/authentication/controllers/getTokenController';
import recoveryPasswordController from './components/authentication/controllers/recoveryPasswordController';
import updatePasswordController from './components/authentication/controllers/updatePasswordController';
import createAlertController from './components/alert/controllers/createAlertController';
import deleteAlertController from './components/alert/controllers/deleteAlertController';
import getAlertDetailsController from './components/alert/controllers/getAlertDetailsController';
import getAlertsController from './components/alert/controllers/getAlertsController';

/** Routers */
import userRouter from './components/user/router';
import authenticationRouter from './components/authentication/router';
import permissionRouter from './components/permission/router';
import alertRouter from './components/alert/router';

/** Utilities */
import Crypt from './libs/crypt';
import Token from './libs/token';
import Response from './libs/response';
import ProcessorFactory from './libs/processor';
import WorkerFactory from './libs/worker';

/** Integrations */
import twilioIntegration from './integrations/twilio';
import sentryConfig from './integrations/sentry';

/** Env Config */
import env from './configs';

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
      Sentry.init(sentryConfig(expressApplication));
      const normalizedPort = utilities.normalizePort(port);

      if (!normalizedPort) {
        throw new Error('Invalid port');
      } else {
        let redisClient = null;

        if (redisDBConnectionString) {
          redisClient = await redisDB.connectRedisDB(redisDBConnectionString);
        }

        await mongoDB.connectMongoDB({
          connectionURL: mongoDBConnectionString,
          options: mongoDBConnectionOptions,
        });

        /** Integrations */
        const twilioClient = twilioIntegration({
          accountSid: env.TWILIO_ACCOUNT_SID,
          authToken: env.TWILIO_AUTH_TOKEN,
          twilioPhoneNumber: env.TWILIO_FROM_PHONE,
        });

        /** Utilities */
        const crypt = Crypt();
        const token = Token({ logger });
        const responseFormat = Response();
        const worker = WorkerFactory({
          logger,
          alertModel: AlertModel,
          twilioIntegration: twilioClient,
        });
        const process = ProcessorFactory({
          alertModel: AlertModel,
          logger,
          worker,
        });

        /** Services initialization */
        const userService = userServiceFactory({
          userModel: UserModel,
          userPermissionsModel: UserPermissionsModel,
          crypt,
        });

        const authenticationService = authenticationServiceFactory({
          userModel: UserModel,
          userPermissionModel: UserPermissionsModel,
          crypt,
          token,
          logger,
          redisClient,
          redisLib: redisDB,
          twilioClient,
        });

        const permissionService = permissionServiceFactory({
          permissionModel: PermissionModel,
        });

        const alertService = alertServiceFactory({
          alertModel: AlertModel,
          logger,
        });

        /** Controllers initialization */
        const getUser = getUserController({ userService, responseFormat });
        const createUser = createUserController({ userService, responseFormat });
        const updateUserPermissions = updateUserPermissionsController({
          userService,
          responseFormat,
        });
        const getToken = getTokenController({ authenticationService, responseFormat });
        const createPermission = createPermissionController({ permissionService, responseFormat });
        const getPermissions = getPermissionsController({ permissionService, responseFormat });
        const recoveryPassword = recoveryPasswordController({
          authenticationService,
          responseFormat,
        });
        const updatePassword = updatePasswordController({
          authenticationService,
          responseFormat,
        });
        const createAlert = createAlertController({
          alertService,
          responseFormat,
        });
        const deleteAlert = deleteAlertController({
          alertService,
          responseFormat,
        });
        const getAlertDetails = getAlertDetailsController({
          alertService,
          responseFormat,
        });
        const getAlerts = getAlertsController({
          alertService,
          responseFormat,
        });

        /** Routes */
        const userRoutes = userRouter({
          getUserController: getUser,
          createUserController: createUser,
          updateUserPermissionsController: updateUserPermissions,
        });

        const authenticationRoutes = authenticationRouter({
          getTokenController: getToken,
          recoveryPasswordController: recoveryPassword,
          updatePasswordController: updatePassword,
        });

        const permissionRoutes = permissionRouter({
          createPermissionController: createPermission,
          getPermissionsController: getPermissions,
        });

        const alertRoutes = alertRouter({
          createAlertController: createAlert,
          deleteAlertController: deleteAlert,
          getAlertDetailsController: getAlertDetails,
          getAlertsController: getAlerts,
        });

        expressApplication.use(Sentry.Handlers.requestHandler());
        expressApplication.use(Sentry.Handlers.tracingHandler());

        expressApplication.use('/api/user', userRoutes);
        expressApplication.use('/api/auth', authenticationRoutes);
        expressApplication.use('/api/permission', permissionRoutes);
        expressApplication.use('/api/alert', alertRoutes);

        /** Not Found Error Handler */
        expressApplication.use(notFoundErrorHandler);

        /** Error Handler - Logger */
        expressApplication.use(Sentry.Handlers.errorHandler({
          shouldHandleError(error) {
            return true;
          },
        }));
        expressApplication.use(logError);

        expressApplication.listen(normalizedPort, () => {
          logger.info(`Environment ${environment}`);
          logger.info(`Server running on http://localhost:${port}`);
        });

        utilities.compressLogs(`system-${new Date().getTime()}`, 'system');

        cron.schedule(`*/${env.CRONJOB_TIME_EXECUTION} * * * *`, async () => {
          await process.processAlertBatches(parseInt(env.PROCESS_BATCH_QUANTITY, 10));
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
