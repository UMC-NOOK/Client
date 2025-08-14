import { useQuery } from '@tanstack/react-query';
import { getBookDetail } from '../../apis/book';

export const useGetBookDetail = (isbn13: string, enabled = true) =>
  useQuery({
    queryKey: ['search','bookDetail', isbn13],
    queryFn: () => getBookDetail(isbn13),
    enabled: !!isbn13 && enabled,
    staleTime: 30_000,
  });
