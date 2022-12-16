import { RedisClientType } from 'redis';

export interface IRedisDBContract {
  connectRedisDB: (redisURLDBConenction: string) => Promise<RedisClientType | null>;
  get: (key: string, client:RedisClientType) => Promise<string | null>;
  set: ({
    key,
    client,
    value,
    expirationTime,
  }: {
    key: string,
    client: RedisClientType,
    value: any
    expirationTime?: number,
  }) => Promise<void>;
  del: (key: string, client:RedisClientType) => Promise<void>;
}
