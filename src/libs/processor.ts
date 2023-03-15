/* eslint-disable no-await-in-loop */
import mongoose from 'mongoose';
import { Logger } from 'winston';
import { IWorkerContract, IProcessorContract, IWorkerPayload } from '../shared/interfaces';

const ProcessorFactory = ({
  logger,
  worker,
  alertModel,
}: {
  logger: Logger;
  worker: IWorkerContract;
  alertModel: mongoose.Model<any>
}): IProcessorContract => ({
  processAlertBatches: async (batchSize) => {
    const countAlerts = await alertModel.countDocuments();
    const cursor = alertModel.find({
      active: true,
    }).populate('user');

    logger.info(`Running batches - Batch Size ${batchSize}`);

    for (let index = 0; index < countAlerts; index += batchSize) {
      const results = await cursor.skip(index).limit(batchSize).lean();
      const workerPayloads = results.map((result) => ({
        alert: {
          _id: result._id,
          successCodes: result.successCodes,
          active: result.active,
          countryCode: result.user.countryCode,
          phoneNumber: result.user.phoneNumber,
          status: result.status,
        },
        config: {
          method: result.method,
          url: result.url,
        },
      } as IWorkerPayload));

      logger.info('Sending batch to worker');
      await worker.processingWorkers(workerPayloads);
    }
  },
});

export default ProcessorFactory;
