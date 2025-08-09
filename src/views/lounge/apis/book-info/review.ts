import instance from '../../../../apis/instance';
import { ReviewResponse } from '../../types/book-info/review';

const ReviewFetch = async (
  id: string | undefined,
): Promise<ReviewResponse | undefined> => {
  try {
    const res = await instance.get<ReviewResponse>(`api/books/${id}/reviews`);
    return res.data;
  } catch (err) {
    console.log('책정보 조회 에러:', err);
  }
};

export default ReviewFetch;
