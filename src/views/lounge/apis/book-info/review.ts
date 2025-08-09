import instance from '../../../../apis/instance';
import {
  ReviewResponse,
  ReviewCreateResponse,
} from '../../types/book-info/review';

export const ReviewFetch = async (
  id: string | undefined,
): Promise<ReviewResponse | undefined> => {
  try {
    const res = await instance.get<ReviewResponse>(`api/books/${id}/reviews`);
    return res.data;
  } catch (err) {
    console.log('책정보 조회 에러:', err);
  }
};

export const ReviewCreate = async (
  id: string | undefined,
  reviewData: { rating: number; content: string },
): Promise<ReviewCreateResponse | undefined> => {
  try {
    console.log('post id:', id);
    const res = await instance.post<ReviewCreateResponse>(
      `api/books/${id}/reviews`,
      reviewData,
    );
    return res.data;
  } catch (err) {
    console.log('리뷰 생성 에러:', err);
  }
};
