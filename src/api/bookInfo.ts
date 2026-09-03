// Client/src/api/bookInfo.ts

import { api } from "./axios";

import type { BaseApiResponse } from "../types/index.type";
import type { BookDetailResponse } from "../types/bookInfo/bookDetail.type";
import type { BookTimelineResponse } from "../types/bookInfo/timeline.type";

const BOOKS_ENDPOINT =
  "/api/v1/books";

const LIBRARY_ENDPOINT =
  "/api/v1/library";

/**
 * ISBN13으로 도서 상세 조회
 *
 * GET /api/v1/books/{isbn13}
 */
export async function getBookDetailWithISBN(
  isbn: string,
): Promise<BookDetailResponse> {
  const response =
    await api.get<
      BaseApiResponse<BookDetailResponse>
    >(
      `${BOOKS_ENDPOINT}/${isbn}`,
    );

  return response.data.result;
}

/**
 * bookId로 도서 상세 조회
 *
 * GET /api/v1/books/id/{bookId}
 */
export async function getBookDetailWithBookId (
  bookId: number,
): Promise<BookDetailResponse> {
  const response = await api.get<BaseApiResponse<BookDetailResponse>>(
    `${BOOKS_ENDPOINT}/id/${bookId}`,
  );
  return response.data.result;
}

/**
 * 서재 도서 타임라인 요약 조회
 *
 * GET /api/v1/library/{libraryId}/timeline/summary
 */
export async function getBookTimeline(
  libraryId: number,
): Promise<BookTimelineResponse> {
  const response =
    await api.get<
      BaseApiResponse<BookTimelineResponse>
    >(
      `${LIBRARY_ENDPOINT}/${libraryId}/timeline/summary`,
    );

  return response.data.result;
}