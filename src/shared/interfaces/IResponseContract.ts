import { Response } from 'express';

interface Pagination {
  page: number,
  limit: number,
  total: number,
  previous: string,
  next: string
}

export interface IResponseContract {
  formatResponse: ({
    response,
    status,
    data,
    pagination,
  }: {
    response: Response
    status: number
    data: any
    pagination?: Pagination
  }) => any
}
