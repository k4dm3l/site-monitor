import { Logger } from 'winston';

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
});

export default Utilities;
