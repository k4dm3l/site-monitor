import dotenv from 'dotenv';

dotenv.config();

export default {
  ENVIRONMENT: process.env.ENVIRONMENT || 'DEVELOPMENT',
  PORT: process.env.PORT || 3001,
  CORS: process.env.CORS || '*',
  MAX_REQUEST_RATE_LIMIT: process.env.MAX_REQUEST_RATE_LIMIT || 5,
  MAX_TIMEOUT_RATE_LIMIT: process.env.MAX_TIMEOUT_RATE_LIMIT || 15000,
};
