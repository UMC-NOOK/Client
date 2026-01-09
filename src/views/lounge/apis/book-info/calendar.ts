import instance from '../../../../apis/instance';
import { Calendar } from '../../types/book-info/calendar';

export const calendarFetch = async (
  date: string,
): Promise<Calendar | undefined> => {
  try {
    const response = await instance.get<Calendar>(
      '/api/bookshelf/registered-dates',
      {
        params: {
          yearMonth: date, // 쿼리스트링 key=value
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching calendar:', error);
    return undefined;
  }
};
