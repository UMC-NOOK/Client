import bookInfoFetch from '../../../apis/book-info/bookInfo';
import { useQuery } from '@tanstack/react-query';

const useGetBookInfo = (isbn: string) => {
  return useQuery({
    queryKey: ['bookInfo', isbn],
    queryFn: () => bookInfoFetch(isbn),
    enabled: !!isbn,
  });
};

export default useGetBookInfo;
