import env from './configs';
import app from './app';
import ServerInitialization from './server';

import logger from './libs/logger';
import Utilities from './libs/utilities';

const utilities = Utilities({ logger });

const serverInit = ServerInitialization({ utilities });

serverInit.startServer({
  expressApplication: app,
  environment: env.ENVIRONMENT,
  logger,
  port: `${env.PORT}`,
});
