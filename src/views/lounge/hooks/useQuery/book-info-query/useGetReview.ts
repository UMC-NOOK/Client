import { ReviewFetch } from '../../../apis/book-info/review';
import { useQuery } from '@tanstack/react-query';

const useGetReview = (bookId: number, currentPost: number) => {
  return useQuery({
    queryKey: ['reviewData', bookId, currentPost],
    enabled: typeof bookId === 'number',
    queryFn: () => ReviewFetch(bookId!, currentPost),
    placeholderData: (prev) => prev, // keepPreviousData
  });
};

export default useGetReview;
