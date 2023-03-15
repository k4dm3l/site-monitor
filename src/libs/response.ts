import { IResponseContract } from '../shared/interfaces';

const ResponseFormat = (): IResponseContract => ({
  formatResponse({
    response, status, data, pagination,
  }) {
    response.status(status).json({
      status,
      data,
      pagination,
    });
  },
});

export default ResponseFormat;
