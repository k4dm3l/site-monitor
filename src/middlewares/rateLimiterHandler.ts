import rateLimiter from 'express-rate-limit';
import env from '../configs';

const checkNumberValue = (value: any):number | undefined => {
  const number = parseInt(value, 10);

  if (Number.isNaN(number)) {
    return undefined;
  }

  if (number > 0) {
    return number;
  }

  return undefined;
};

const limiter = rateLimiter({
  max: checkNumberValue(env.MAX_REQUEST_RATE_LIMIT) || 10,
  windowMs: checkNumberValue(env.MAX_TIMEOUT_RATE_LIMIT) || 10000,
  message: "You can't make any more requests at the moment. Try again later",
});

export default limiter;
