import { bookRegistrationChangeStatus } from '../../../../lounge/apis/book-info/bookRegistration';
import useDeleteBook from '../../../hooks/useMutation/library-mutation/useDeleteBook';
import usePostBookRegistration from '../../../../home/hooks/useMutation/usePostBookRegistration';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePatchBookState = (bookId: number) => {
  const queryClient = useQueryClient();
  const { mutate: postBookRegistration } = usePostBookRegistration(bookId!);
  const { mutate: deleteBook } = useDeleteBook();

  return useMutation({
    mutationFn: async ({
      readingStatus,
      date,
    }: {
      readingStatus: string;
      date: string | null;
    }) => {
      if (readingStatus === 'READING') {
        return bookRegistrationChangeStatus(bookId, readingStatus, date);
      } else if (readingStatus === 'FINISHED') {
        return bookRegistrationChangeStatus(bookId, readingStatus, date);
      } else if (readingStatus === 'BOOKMARK') {
        return bookRegistrationChangeStatus(bookId, readingStatus, null);
      }
      return undefined;
    },
    onSuccess: async () => {
      // await queryClient.invalidateQueries({ queryKey: ['bookInfo'] });
    },
  });
};

export default usePatchBookState;
