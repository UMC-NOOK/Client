import { useQuery } from '@tanstack/react-query';
import bookListFetch from '../../../apis/private-reading-room/bookListFetch';

const useGetBookList = () => {
  return useQuery({
    queryKey: ['bookListData'],
    queryFn: bookListFetch,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export default useGetBookList;
