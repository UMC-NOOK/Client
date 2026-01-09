import instance from '../../../../apis/instance';
import {
  BookRegistrationResponse,
  BookRegistrationStartResponse,
} from '../../types/book-info/bookRegistration';

export const bookRegistration = async (
  bookId: number | undefined,
  date: string | null,
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

export const bookRegistrationChangeStatus = async (
  bookId: number | undefined,
  status: string,
  recordedAt: string | null,
): Promise<BookRegistrationStartResponse | undefined> => {
  try {
    const response = await instance.patch<BookRegistrationStartResponse>(
      `/api/bookshelf/change-status`,
      {
        bookId,
        status,
        recordedAt,
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error starting book registration:', error);
    return undefined;
  }
};
