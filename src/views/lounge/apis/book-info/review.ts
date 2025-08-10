import instance from '../../../../apis/instance';
import {
  ReviewResponse,
  ReviewCreateResponse,
  ReviewDeleteResponse,
} from '../../types/book-info/review';

export const ReviewFetch = async (
  id: number | undefined,
  page: number = 1,
): Promise<ReviewResponse | undefined> => {
  try {
    const res = await instance.get<ReviewResponse>(`api/books/${id}/reviews`, {
      params: { page },
    });
    return res.data;
  } catch (err) {
    console.log('책정보 조회 에러:', err);
  }
};

export const ReviewCreate = async (
  id: number | undefined,
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

export const ReviewDelete = async (
  reviewId: number | undefined,
): Promise<ReviewDeleteResponse | undefined> => {
  try {
    const res = await instance.delete<ReviewDeleteResponse>(
      `api/reviews/${reviewId}`,
    );
    return res.data;
  } catch (err) {
    console.log('리뷰 삭제 에러:', err);
  }
};
