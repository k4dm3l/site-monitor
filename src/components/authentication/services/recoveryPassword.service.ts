import mongoose from 'mongoose';
import { randomBytes } from 'crypto';
import { RedisClientType } from 'redis';
import { Logger } from 'winston';

import RedisTypes from '../../../shared/enums/redisTypes';

import { IRecoveryPasswordContract, IRedisDBContract, ITwilioIntegrationContract } from '../../../shared/interfaces';

import env from '../../../configs';

const generateRandomVerificationCode = (): number => {
  const bytes = randomBytes(4);
  const verificationCode = bytes.readUInt32BE(0);
  const max = 9999999;
  return verificationCode % (max + 1000000);
};

const recoveryPasswordFactory = ({
  userModel,
  twilioClient,
  redisClient,
  redisLib,
  logger,
}: {
  userModel: mongoose.Model<any>;
  twilioClient: ITwilioIntegrationContract;
  redisClient: RedisClientType | null;
  redisLib: IRedisDBContract;
  logger: Logger;
}): IRecoveryPasswordContract => ({
  recoveryPassword: async (email) => {
    const userContactInformation = await userModel.findOne({
      email,
    }, {
      _id: 1,
      phoneNumber: 1,
      countryCode: 1,
    }).lean();

    if (userContactInformation.phoneNumber && userContactInformation.countryCode) {
      const verificationCode = generateRandomVerificationCode();

      if (redisClient) {
        await redisLib.set({
          client: redisClient,
          key: `${RedisTypes.VERIFICATION_CODE}_${userContactInformation._id}`,
          value: JSON.stringify({ verificationCode, user: userContactInformation._id }),
          expirationSeconds: Number(env.VERIFICATION_CODE_RECOVERY_PASSWORD),
        });

        logger.info(`${email} - new verification code: ${verificationCode}`);

        const twilioApiResponse = await twilioClient.sendSMS(
          `${userContactInformation.countryCode}${userContactInformation.phoneNumber}`,
          `This is the verification code required for recovery password process ${verificationCode}`,
        );

        logger.info(`verification code sent to ****${userContactInformation.phoneNumber.slice(-6)} - SSID ${twilioApiResponse.data.sid}`);
      }
    }
  },
});

export default recoveryPasswordFactory;
