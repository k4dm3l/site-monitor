import mongoose from 'mongoose';
import { Logger } from 'winston';
import { RedisClientType } from 'redis';

import getTokenFactory from './getToken.service';
import recoveryPasswordFactory from './recoveryPassword.service';
import updatePasswordFactory from './updatePassword.service';

import {
  IAuthenticationServiceContract, ICryptContract, ITokenContract, IRedisDBContract,
} from '../../../shared/interfaces';

const authenticationService = ({
  userModel,
  userPermissionModel,
  crypt,
  token,
  logger,
  twilioClient,
  redisClient,
  redisLib,
}: {
  userModel: mongoose.Model<any>;
  userPermissionModel: mongoose.Model<any>;
  crypt: ICryptContract;
  token: ITokenContract;
  logger: Logger;
  twilioClient: any
  redisClient: RedisClientType | null;
  redisLib: IRedisDBContract;
}): IAuthenticationServiceContract => {
  const { getToken } = getTokenFactory({
    userModel, userPermissionModel, crypt, token,
  });

  const { recoveryPassword } = recoveryPasswordFactory({
    logger,
    userModel,
    redisClient,
    redisLib,
    twilioClient,
  });

  const { updatePassword } = updatePasswordFactory({
    crypt,
    logger,
    redisClient,
    redisLib,
    twilioClient,
    userModel,
  });

  return {
    getToken,
    recoveryPassword,
    updatePassword,
  };
};

export default authenticationService;
