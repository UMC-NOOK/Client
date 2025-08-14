import { ReviewEdit } from '../../../apis/book-info/review';
import { useMutation } from '@tanstack/react-query';

const usePutReview = (reviewId: number) => {
  return useMutation({
    mutationFn: (payload: { rating: number; content: string }) =>
      ReviewEdit(reviewId, payload),
  });
};

export default usePutReview;
