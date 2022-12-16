import env from './configs';
import app from './app';
import ServerInitialization from './server';

import logger from './libs/logger';
import Utilities from './libs/utilities';
import MongoDB from './libs/mongo';
import RedisDB from './libs/redis';

const utilities = Utilities({ logger });
const mongoDB = MongoDB({ logger });
const redisDB = RedisDB({ logger });

const serverInit = ServerInitialization({ utilities, mongoDB, redisDB });

serverInit.startServer({
  expressApplication: app,
  environment: env.ENVIRONMENT,
  logger,
  port: `${env.PORT}`,
  mongoDBConnectionString: env.MONGO_DB_CONNECTION,
  mongoDBConnectionOptions: {
    autoIndex: true,
    maxPoolSize: 10,
  },
  redisDBConnectionString: env.REDIS_DB_CONNECTION,
});
