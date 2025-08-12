import instance from '../../../apis/instance';
import type { MonthlyMyBooksResponse } from '../../home/type/home';

export const getHomeMonthlyBooks = async (yearMonth: string) => {
  const { data } = await instance.get<MonthlyMyBooksResponse>(
    '/api/bookshelf/my-books/monthly',
    { params: { yearMonth } },
  );
  return data; // Envelope 아님!
};
