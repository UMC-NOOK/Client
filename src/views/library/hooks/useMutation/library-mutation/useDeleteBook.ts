import { useMutation, useQueryClient } from '@tanstack/react-query';
import bookDelete from '../../../apis/library/book/bookDelete';

const useDeleteBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ bookId }: { bookId: number }) => bookDelete({ bookId }),
    onSuccess: (_data, { bookId }) => {
      console.log('성공');

      queryClient.setQueryData(['bookState'], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data?.filter((b: any) => b.bookId !== bookId),
        };
      });
      queryClient.invalidateQueries({ queryKey: ['bookState'] });
    },
  });
};

export default useDeleteBook;
