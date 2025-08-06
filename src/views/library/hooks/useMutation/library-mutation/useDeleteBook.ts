import { useMutation, useQueryClient } from '@tanstack/react-query';
import bookDelete from '../../../apis/library/book/bookDelete';

interface useDeleteBookProps {
  bookId: number;
}

const useDeleteBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookId: useDeleteBookProps) => bookDelete(bookId),
    onSuccess: (_data, deletedId) => {
      queryClient.setQueryData(['bookState'], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data?.filter((b: any) => b.id !== deletedId),
        };
      });
      queryClient.invalidateQueries({ queryKey: ['bookState'] });
    },
  });
};

export default useDeleteBook;
