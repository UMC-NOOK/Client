import { bookRegistration } from '../../../apis/book-info/bookRegistration';
import { useMutation } from '@tanstack/react-query';

const usePostBookRegistration = (bookId: number) => {
  return useMutation({
    mutationFn: ({
      date,
      readingStatus,
    }: {
      date: string;
      readingStatus: string;
    }) => bookRegistration(bookId, date, readingStatus),
  });
};

export default usePostBookRegistration;
