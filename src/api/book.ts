import { api } from "./axios";

export interface BookDetail {
  bookId: number;
  isbn13: string | null;
  title: string;
  author: string;
  publisher: string | null;
  publicationDate: string | null;
  mallType: string | null;
  mallTypeCode: string | null;
  category: string | null;
  pages: number | null;
  description: string | null;
  coverImageUrl: string | null;
  aladinLink: string | null;
  sourceType: string;
  bookShelfId: number | null;
}

interface BasicResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

export type CreateUserBookParams = {
  title: string;
  author: string;
  categoryName: string;
  description?: string;
  pages?: number;
  publisher?: string;
  publicationDate?: string;
  isbn13?: string;
  coverImageKey?: string;
};

export async function createUserBook(
  params: CreateUserBookParams,
): Promise<BookDetail> {
  const response = await api.post<BasicResponse<BookDetail>>(
    "/api/v1/books/user",
    params,
  );

  return response.data.result;
}