import Bull from 'bull';
import axios from 'axios';
import { Logger } from 'winston';
import mongoose from 'mongoose';
// import { RedisClientType } from 'redis';

// import RedisTypes from '../shared/enums/redisTypes';
import {
  IWorkerContract,
  // IWorkerPayload,
  ITwilioIntegrationContract,
  // IRedisDBContract,
} from '../shared/interfaces';

import AlertStatus from '../shared/enums/alertStatus';

const queue = new Bull('site-monitor-jobs');

const makeAPICall = async (workerPayload: any): Promise<any> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios(workerPayload.data.workerPayload.config);

    return {
      alert: workerPayload.data.workerPayload,
      status: response.status,
    };
  } catch (error: any) {
    throw error;
  }
};

const WorkerFactory = ({
  logger,
  alertModel,
  twilioIntegration,
}: {
  logger: Logger;
  alertModel: mongoose.Model<any>;
  twilioIntegration: ITwilioIntegrationContract;
}): IWorkerContract => ({
  processingWorkers: async (workerPayloads) => {
    logger.info('Adding to queue');
    // eslint-disable-next-line no-restricted-syntax
    for (const workerPayload of workerPayloads) {
      // eslint-disable-next-line no-await-in-loop
      await queue.add({ workerPayload }, { removeOnComplete: true });
    }

    logger.info('Processing queue');

    queue.process(
      // NUM_CPUS,
      async (job:any, done) => {
        try {
          logger.info('Calling URL');
          const response = await makeAPICall(job);
          const statusValidation = job.data.workerPayload.alert.successCodes.includes(
            response.status,
          )
            ? AlertStatus.UP
            : AlertStatus.DOWN;

          if (statusValidation !== job.data.workerPayload.alert.status) {
            logger.info(`Alert ID ${job.data.workerPayload.alert._id} - Status change ${job.data.workerPayload.alert.status} => ${statusValidation}`);
            await alertModel.findByIdAndUpdate(job.data.workerPayload.alert._id, {
              status: statusValidation,
            });

            await twilioIntegration.sendSMS(
              `${job.data.workerPayload.alert.countryCode}${job.data.workerPayload.alert.phoneNumber}`,
              `The alert ***${job.data.workerPayload.alert._id.slice(-6)} configured for website ${job.data.workerPayload.config.url} detected a change in its status from ${job.data.workerPayload.alert.status} to ${statusValidation}.`,
            );

            logger.info(`SMS notification for Alert ID ${job.data.workerPayload.alert._id} was sent`);
          } else {
            logger.info(`No status change detected for Alert ID ${job.data.workerPayload.alert._id}`);
          }

          logger.info(`Job done by worker ${job.id} - Alert ID ${job.data.workerPayload.alert._id}`);
          done(null, response);
        } catch (error) {
          logger.error(`Job ${job.id} fails`);
          done(error as Error);
        }
      },
    );
  },
});

export default WorkerFactory;
