import {
  bookRegistrationStart,
  bookRegistrationFinish,
} from '../../../../lounge/apis/book-info/bookRegistration';
import useDeleteBook from '../../../hooks/useMutation/library-mutation/useDeleteBook';
import usePostBookRegistration from '../../../../home/hooks/useMutation/usePostBookRegistration';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePatchBookState = (bookId: number) => {
  const queryClient = useQueryClient();
  const { mutate: postBookRegistration } = usePostBookRegistration(bookId!);
  const { mutate: deleteBook } = useDeleteBook();

  return useMutation({
    mutationFn: async (readingStatus: string) => {
      if (readingStatus === 'READING') {
        return bookRegistrationStart(bookId);
      } else if (readingStatus === 'FINISHED') {
        return bookRegistrationFinish(bookId);
      } else if (readingStatus === 'BOOKMARK') {
        await new Promise<void>((resolve) => {
          deleteBook(
            { bookId },
            {
              onSuccess: () => resolve(),
              onError: () => resolve(),
            },
          );
        });
        return postBookRegistration({
          date: null,
          readingStatus: 'BOOKMARK',
        });
      }
      return undefined;
    },
    onSuccess: async () => {
      // await queryClient.invalidateQueries({ queryKey: ['bookInfo'] });
    },
  });
};

export default usePatchBookState;
