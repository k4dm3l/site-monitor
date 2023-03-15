import mongoose from 'mongoose';
import { RedisClientType } from 'redis';
import { Logger } from 'winston';

import BusinessError from '../../../shared/errors/BusinessError';
import RedisTypes from '../../../shared/enums/redisTypes';
import ForbiddenError from '../../../shared/errors/ForbiddenError';

import {
  IRedisDBContract, ITwilioIntegrationContract, IUpdatePasswordContract, ICryptContract,
} from '../../../shared/interfaces';

import ServerError from '../../../shared/errors/ServerError';

const updatePasswordFactory = ({
  userModel,
  twilioClient,
  redisClient,
  redisLib,
  logger,
  crypt,
}: {
  userModel: mongoose.Model<any>;
  twilioClient: ITwilioIntegrationContract;
  redisClient: RedisClientType | null;
  redisLib: IRedisDBContract;
  logger: Logger;
  crypt: ICryptContract;
}): IUpdatePasswordContract => ({
  updatePassword: async (email, payload) => {
    const user = await userModel.findOne({
      email,
    }, {
      _id: 1,
      phoneNumber: 1,
      countryCode: 1,
    }).lean();

    if (!user) throw new BusinessError('Verify the email associated to your account');

    if (!redisClient) throw new ServerError('Error with Redis client connection');

    const validationVerificationInfo = await redisLib.get(`${RedisTypes.VERIFICATION_CODE}_${user._id}`, redisClient);

    if (!validationVerificationInfo) throw new BusinessError('No valid verification information');

    const parsedVerificationInfo = JSON.parse(validationVerificationInfo);

    if (parsedVerificationInfo.verificationCode !== payload.verificationCode) throw new ForbiddenError('Invalid verification code');

    if (payload.newPassword !== payload.confirmationPassword) throw new BusinessError('Password not match');

    logger.info('Verification user authenticity OK');

    const hashPassword = await crypt.hashPassword(payload.newPassword);

    await userModel.findByIdAndUpdate(user._id, {
      hashPassword,
    });

    logger.info(`Password Updated - user: ${user._id} - email: ${email} - password: ***${hashPassword.slice(-8)}`);

    await redisLib.del(`${RedisTypes.VERIFICATION_CODE}_${user._id}`, redisClient);
    await twilioClient.sendSMS(
      `${user.countryCode}${user.phoneNumber}`,
      `The password for user ${email} was changed. If this action was not performed by you, please contact technical support immediately.`,
    );

    logger.info(`Confirmation change password SMS send to ****${user.phoneNumber.slice(-6)}`);
  },
});

export default updatePasswordFactory;
