import { useQuery } from '@tanstack/react-query';
import bookFetchMonth from '../../../apis/library/book/bookFetchMonth';
import type { bookFetchStateProps } from '../../../apis/library/book/bookFetchState';
import bookFetchState from '../../../apis/library/book/bookFetchState';

const useGetBookState = ({
  status,
  cursorBookId,
  size,
  sort,
}: bookFetchStateProps) => {
  return useQuery({
    queryKey: ['bookData', status, sort],
    queryFn: () => bookFetchState({ status, cursorBookId, size, sort }),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export default useGetBookState;
