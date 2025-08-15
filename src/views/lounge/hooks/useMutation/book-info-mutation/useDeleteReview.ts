import { ReviewDelete } from '../../../apis/book-info/review';
import { useMutation } from '@tanstack/react-query';

const useDeleteReview = (reviewId: number) => {
  return useMutation({
    mutationFn: () => ReviewDelete(reviewId),
  });
};

export default useDeleteReview;
