import { useQuery } from '@tanstack/react-query';
import bookFetchMonth from '../../../apis/library/book/bookFetchMonth';
import type { bookFetchMonthProps } from '../../../apis/library/book/bookFetchMonth';

const useGetBookMonth = ({ yearMonth }: bookFetchMonthProps) => {
  return useQuery({
    queryKey: ['bookData', yearMonth],
    queryFn: () => bookFetchMonth({ yearMonth }),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export default useGetBookMonth;
