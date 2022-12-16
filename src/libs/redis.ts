import { createClient, RedisClientType } from 'redis';
import { Logger } from 'winston';

import { IRedisDBContract } from '../shared/interfaces';

const RedisDB = ({ logger }: { logger: Logger }): IRedisDBContract => ({
  connectRedisDB: async (redisURLDBConenction) => {
    const redisClient: RedisClientType = createClient({
      url: redisURLDBConenction,
    });

    redisClient.on('error', (err) => logger.error(err));

    if (redisClient) {
      await redisClient.connect();
      logger.info(`Redis DB connected: ${redisURLDBConenction}`);
      return redisClient;
    }

    return null;
  },
  get: async (key, client) => {
    const response = await client.get(key);
    return response;
  },
  set: async ({
    key,
    client,
    value,
    expirationTime,
  }) => {
    if (expirationTime) {
      await client.setEx(key, expirationTime, value);
    } else {
      await client.set(key, value);
    }
  },
  del: async (key, client) => {
    await client.del(key);
  },
});

export default RedisDB;
