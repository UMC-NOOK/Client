import instance from '../../../../apis/instance';
import { BookRegistrationResponse } from '../../types/book-info/bookRegistration';

export const bookRegistration = async (
  bookId: number | undefined,
  date: string,
  readingStatus: string,
): Promise<BookRegistrationResponse | undefined> => {
  try {
    const response = await instance.post<BookRegistrationResponse>(
      '/api/bookshelf/register',
      {
        bookId,
        date,
        readingStatus,
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error registering book:', error);
    return undefined;
  }
};