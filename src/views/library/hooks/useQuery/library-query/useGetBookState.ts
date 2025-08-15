import { useQuery } from '@tanstack/react-query';
import bookFetchMonth from '../../../apis/library/book/bookFetchMonth';
import type { bookFetchStateProps } from '../../../apis/library/book/bookFetchState';
import bookFetchState from '../../../apis/library/book/bookFetchState';

interface UseGetBookStateProps extends bookFetchStateProps {
  page?: number;
}

const useGetBookState = ({
  status,
  page = 0,
  size,
  sort,
}: UseGetBookStateProps) => {
  return useQuery({
    queryKey: ['bookData', status, sort],
    queryFn: () => bookFetchState({ status, page, size, sort }),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: typeof page === 'number' && page >= 0,
  });
};

export default useGetBookState;
