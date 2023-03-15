import { RedisClientType } from 'redis';

export interface IRedisObjectAlertHistory {
  alertId: string
}

export interface IRedisDBContract {
  connectRedisDB: (redisURLDBConenction: string) => Promise<RedisClientType | null>;
  get: (key: string, client:RedisClientType) => Promise<string | null>;
  set: ({
    key,
    client,
    value,
    expirationSeconds,
  }: {
    key: string,
    client: RedisClientType,
    value: any
    expirationSeconds?: number,
  }) => Promise<void>;
  del: (key: string, client:RedisClientType) => Promise<void>;
  searchObjectsByProperty?: (
    searchParam: string,
    client:RedisClientType
  ) => Promise<IRedisObjectAlertHistory[]>
}
