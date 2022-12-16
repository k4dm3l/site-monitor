import jwt from 'jsonwebtoken';
import { Logger } from 'winston';

import env from '../configs';
import { ITokenContract } from '../shared/interfaces';

const Token = ({ logger }: {logger: Logger}):ITokenContract => ({
  generateToken: (userData) => {
    const token = jwt.sign(userData, env.JWT_TOKEN_SECRET, {
      expiresIn: env.JWT_EXPIRATION_TIME,
    });

    logger.info(`${userData.email} - new token: ****${token.slice(-6)}`);

    return token;
  },
});

export default Token;
