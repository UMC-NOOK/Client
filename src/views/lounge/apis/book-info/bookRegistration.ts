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

export const bookRegistrationStart = async (
  bookId: number | undefined,
): Promise<BookRegistrationStartResponse | undefined> => {
  try {
    const response = await instance.post<BookRegistrationStartResponse>(
      `/api/bookshelf/start-reading/${bookId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error starting book registration:', error);
    return undefined;
  }
};

export const bookRegistrationFinish = async (
  bookId: number | undefined,
): Promise<BookRegistrationResponse | undefined> => {
  try {
    const response = await instance.post<BookRegistrationResponse>(
      `/api/bookshelf/finish-reading/${bookId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error finishing book registration:', error);
    return undefined;
  }
};
