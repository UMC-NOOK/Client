//Client/src/api/search.ts
import { api } from "./axios";

export type SearchType = "GLOBAL" | "LIBRARY";

export interface SearchBookItem {
  isbn13: string;
  title: string;
  mallType: string;
  author: string;
  coverImageUrl: string;
  publisher: string;
  publicationDate: string;
  inLibrary: boolean;
  readingStatus: string | null;
}

export interface SearchBooksResult {
  totalResults: number;
  hasNext: boolean;
  nextCursor: number | null;
  books: SearchBookItem[];
}

export interface BookSearchResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: SearchBooksResult;
}

type SearchBooksParams = {
  type: SearchType;
  keyword: string;
  cursor?: number;
};

export async function searchBooks({
  type,
  keyword,
  cursor,
}: SearchBooksParams): Promise<SearchBooksResult> {
  const response = await api.get<BookSearchResponse>(`/api/books/search/${type}`, {
    params: {
      keyword,
      cursor,
    },
  });

  return response.data.result ?? [];
}


export interface SearchHistoryListResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string[];
}

export async function getSearchHistories(
  type: SearchType,
): Promise<string[]> {
  const response = await api.get<SearchHistoryListResponse>(
    `/api/books/search/${type}/histories`,
  );

  return response.data.result ?? [];
}

interface BasicResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: null;
}

export async function deleteSearchHistory(
  type: SearchType,
  keyword: string,
): Promise<void> {
  await api.delete<BasicResponse>(`/api/books/search/${type}/histories`, {
    params: {
      keyword,
    },
  });
}