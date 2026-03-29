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
  coverImage?: File | null;
  title: string;
  author: string;
  categoryName?: string;
  description?: string;
  pages?: number;
  publisher?: string;
  publicationDate?: string;
  isbn13?: string;
};

export async function createUserBook(
  params: CreateUserBookParams,
): Promise<BookDetail> {
  const formData = new FormData();

  if (params.coverImage) {
    formData.append("coverImage", params.coverImage);
  }

  formData.append("title", params.title);
  formData.append("author", params.author);

  if (params.categoryName) {
    formData.append("categoryName", params.categoryName);
  }

  if (params.description) {
    formData.append("description", params.description);
  }

  if (typeof params.pages === "number" && !Number.isNaN(params.pages)) {
    formData.append("pages", String(params.pages));
  }

  if (params.publisher) {
    formData.append("publisher", params.publisher);
  }

  if (params.publicationDate) {
    formData.append("publicationDate", params.publicationDate);
  }

  if (params.isbn13) {
    formData.append("isbn13", params.isbn13);
  }

  const response = await api.post<BasicResponse<BookDetail>>(
    "/api/books/user",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data.result;
}