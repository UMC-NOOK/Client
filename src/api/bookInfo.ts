import { api } from "./axios";

import type { BaseApiResponse } from "../types/index.type";
import type { BookDetailResponse } from "../types/bookInfo/bookDetail.type";
import type { BookTimelineResponse } from "../types/bookInfo/timeline.type";

const BOOKS_ENDPOINT = "/api/v1/books";
const LIBRARY_ENDPOINT = "/api/v1/library";

export async function getBookDetailWithISBN(
  isbn: string,
): Promise<BookDetailResponse> {
  const response = await api.get<BaseApiResponse<BookDetailResponse>>(
    `${BOOKS_ENDPOINT}/${isbn}`,
  );
  return response.data.result;
}

export async function getBookDetailWithBookId (
  bookId: number,
): Promise<BookDetailResponse> {
  const response = await api.get<BaseApiResponse<BookDetailResponse>>(
    `${BOOKS_ENDPOINT}/id/${bookId}`,
  );
  return response.data.result;
}

export async function getBookTimeline(
  libraryId: number,
): Promise<BookTimelineResponse> {
  const response = await api.get<BaseApiResponse<BookTimelineResponse>>(
    `${LIBRARY_ENDPOINT}/${libraryId}/timeline/summary`,
  );
  return response.data.result;
}
