import { ReviewCreate } from '../../../apis/book-info/review';
import { useMutation } from '@tanstack/react-query';

const usePostReview = (bookId: number) => {
  return useMutation({
    mutationFn: (payload: { rating: number; content: string }) =>
      ReviewCreate(bookId, payload),
  });
};

export default usePostReview;
