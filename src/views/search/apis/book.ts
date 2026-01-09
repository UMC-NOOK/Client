import instance from '../../../apis/instance';

export type BookDetail = {
  book: {
    bookId: number;
    isbn13: string;
    title: string;
    author: string;
    publisher: string;
    publicationDate: string;
    mallType: string;
    category: string;
    pages: number;
    description: string;
    coverImageUrl: string;
    registeredBookshelf: boolean;
  };
  bestInThisCategory: Array<{
    isbn13: string;
    title: string;
    author: string;
    publisher: string;
    coverImageUrl: string;
  }>;
};

type Envelope<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};

// GET /api/books/{isbn13}
export const getBookDetail = async (isbn13: string): Promise<BookDetail> => {
  const { data } = await instance.get<Envelope<BookDetail>>(`/api/books/${isbn13}`);
  return data.result;
};
