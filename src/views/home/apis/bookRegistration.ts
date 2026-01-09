import instance from '../../../apis/instance';
import { BookRegistrationResponse } from '../../lounge/types/book-info/bookRegistration';

export const bookRegistration = async (
  bookId: number,
  date: string | null,
  readingStatus: 'READING' | 'FINISHED' | 'BOOKMARK',
): Promise<BookRegistrationResponse> => {
  const { data } = await instance.post<BookRegistrationResponse>(
    '/api/bookshelf/register',
    { bookId, date, readingStatus },
  );
  return data;
};
