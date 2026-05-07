import { api } from "./axios";

import type { BaseApiResponse } from "../types/index.type";
import type { BookDetailResponse } from "../types/bookInfo/bookDetail.type";

const RECORDS_ENDPOINT = "/api/v1/books";

export async function getBookDetailWithISBN(
  isbn: string,
): Promise<BookDetailResponse> {
  const response = await api.get<BaseApiResponse<BookDetailResponse>>(
    `${RECORDS_ENDPOINT}/${isbn}`,
  );
  return response.data.result;
}

export async function getBookDetailWithBookId(
  bookId: number,
): Promise<BookDetailResponse> {
  const response = await api.get<BaseApiResponse<BookDetailResponse>>(
    `${RECORDS_ENDPOINT}/${bookId}`,
  );
  return response.data.result;
}
