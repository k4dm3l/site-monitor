import { createClient, RedisClientType } from 'redis';
import { Logger } from 'winston';
import { promisify } from 'util';

import { IRedisDBContract, IRedisObjectAlertHistory } from '../shared/interfaces';

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
    expirationSeconds,
  }) => {
    if (expirationSeconds) {
      await client.set(key, value, {
        EX: expirationSeconds,
      });
    } else {
      await client.set(key, value);
    }
  },
  del: async (key, client) => {
    await client.del(key);
  },
  searchObjectsByProperty: async (searchParam, client) => {
    const scanAsync = promisify(client.scan).bind(client);
    const getAsync = promisify(client.get).bind(client);

    const keys = await scanAsync('0', 'MATCH', '*');
    const objects: IRedisObjectAlertHistory[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const key of keys[1]) {
      // eslint-disable-next-line no-await-in-loop
      const value = await getAsync(key);

      try {
        const obj = JSON.parse(value);

        if (typeof obj === 'object' && obj !== null && obj.alert === searchParam) {
          objects.push(obj);
        }
      } catch (err) {
        logger.error(`Error parsing value for key ${key}: ${err}`);
      }
    }

    return objects;
  },
});

export default RedisDB;
