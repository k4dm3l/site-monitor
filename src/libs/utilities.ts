import { Logger } from 'winston';
import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

import { IUtilitiesContract } from '../shared/interfaces';

const Utilities = ({ logger }: {logger: Logger}):IUtilitiesContract => ({
  normalizePort: (port) => {
    const normalizedPortNumber = parseInt(port, 10);

    if (Number.isNaN(normalizedPortNumber)) {
      return undefined;
    }

    if (normalizedPortNumber > 0) {
      return normalizedPortNumber;
    }

    return undefined;
  },
  handlerFatalException: (error) => {
    logger.info(error);
    process.exit(1);
  },
  compressLogs: async (logId, logFileName) => {
    const compressedLogId = `${logId}.gz.b64`;

    fs.readFile(`${path.join(__dirname.split('dist')[0], 'logs')}/${logFileName}.log`, 'utf8', (error, data) => {
      if (error) {
        logger.error('Not able to read log file');
      } else {
        zlib.gzip(data, (errorCompress, buffer) => {
          if (errorCompress || !buffer) {
            logger.error('Not able to generate log file buffer to compress');
          } else {
            fs.open(
              `${path.join(__dirname.split('dist')[0], 'logs')}/${compressedLogId}`,
              'wx',
              (errorOpen, fileDescriptor) => {
                if (errorOpen || !fileDescriptor) {
                  logger.error('Not able to save log file compressed');
                } else {
                  fs.writeFile(
                    fileDescriptor,
                    buffer.toString('base64'),
                    (errorWrite) => {
                      if (errorWrite) {
                        logger.error('Not able to write log file compressed');
                      } else {
                        fs.close(
                          fileDescriptor,
                          (errorClose) => {
                            if (errorClose) {
                              logger.error('Not able to write log file compressed');
                            } else {
                              fs.unlink(
                                `${path.join(__dirname.split('dist')[0], 'logs')}/${logFileName}.log`,
                                (errorUnlink) => {
                                  if (errorUnlink) {
                                    logger.error('Not able to delete old log file');
                                  } else {
                                    fs.openSync(
                                      `${path.join(__dirname.split('dist')[0], 'logs')}/${logFileName}.log`,
                                      'w',
                                    );
                                    logger.info('Success compress log file process');
                                  }
                                },
                              );
                            }
                          },
                        );
                      }
                    },
                  );
                }
              },
            );
          }
        });
      }
    });
  },
});

export default Utilities;
