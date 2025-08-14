import instance from '../../../../apis/instance';
import { BookInfoResponse } from '../../types/book-info/bookInfo';

const bookInfoFetch = async (
  id: string | undefined,
): Promise<BookInfoResponse | undefined> => {
  try {
    const res = await instance.get<BookInfoResponse>(`api/books/${id}`);
    return res.data;
  } catch (err) {
    console.log('책정보 조회 에러:', err);
  }
};

export default bookInfoFetch;
