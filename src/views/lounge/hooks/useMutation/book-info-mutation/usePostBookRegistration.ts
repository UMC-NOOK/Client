import { bookRegistration } from '../../../apis/book-info/bookRegistration';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePostBookRegistration = (bookId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      date,
      readingStatus,
    }: {
      date: string | null;
      readingStatus: string;
    }) => bookRegistration(bookId, date, readingStatus),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['bookInfo'] });
    },
  });
};

export default usePostBookRegistration;
