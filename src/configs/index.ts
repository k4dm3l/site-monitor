import dotenv from 'dotenv';

dotenv.config();

export default {
  ENVIRONMENT: process.env.ENVIRONMENT || 'DEVELOPMENT',
  PORT: process.env.PORT || 3001,
  CORS: process.env.CORS || '*',
  MAX_REQUEST_RATE_LIMIT: process.env.MAX_REQUEST_RATE_LIMIT || 5,
  MAX_TIMEOUT_RATE_LIMIT: process.env.MAX_TIMEOUT_RATE_LIMIT || 15000,
  MONGO_DB_CONNECTION: process.env.MONGO_DB_CONNECTION || '',
  REDIS_DB_CONNECTION: process.env.REDIS_DB_CONNECTION || 'redis://localhost:6379',
  JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET || 'test',
  JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME || '2h',
};
