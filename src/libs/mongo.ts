import mongoose from 'mongoose';
import { Logger } from 'winston';

import ServerError from '../shared/errors/ServerError';
import { IMongoDBContract } from '../shared/interfaces';

mongoose.set('strictQuery', false);

const MongoDB = ({ logger }: {logger: Logger}): IMongoDBContract => ({
  connectMongoDB: async ({ connectionURL, options }) => {
    try {
      const connection = await mongoose.connect(connectionURL, options);

      if (!connection) {
        throw new ServerError('mongodb: error connection', { url: connectionURL });
      }

      logger.info(`Mongo DB connected: ${connection.connection.host}`);
    } catch (error) {
      logger.error(`Mongo DB connection error: ${error}`);
    }
  },
  closeMongoDBConnection: async () => {
    try {
      await mongoose.disconnect();
    } catch (error) {
      logger.error(`Mongo DB dissconnection error: ${error}`);
    }
  },
  closeMongoDBConnectionCrashNodeProcess: () => {
    mongoose.connection.close(() => process.exit(0));
  },
});

export default MongoDB;
