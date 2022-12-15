import env from './configs';
import app from './app';
import ServerInitialization from './server';

import logger from './libs/logger';
import Utilities from './libs/utilities';
import MongoDB from './libs/mongo';

const utilities = Utilities({ logger });
const mongoDB = MongoDB({ logger });

const serverInit = ServerInitialization({ utilities, mongoDB });

serverInit.startServer({
  expressApplication: app,
  environment: env.ENVIRONMENT,
  logger,
  port: `${env.PORT}`,
  dbConnectionString: env.MONGO_DB_CONNECTION,
  dbConnectionOptions: {
    autoIndex: true,
    maxPoolSize: 10,
  },
});
