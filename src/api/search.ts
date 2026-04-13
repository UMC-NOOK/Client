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
  const response = await api.get<BookSearchResponse>(`/api/v1/books/search/${type}`, {
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
    `/api/v1/books/search/${type}/histories`,
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
  await api.delete<BasicResponse>(`/api/v1/books/search/${type}/histories`, {
    params: {
      keyword,
    },
  });
}


export type LibraryHomeSectionType =
  | "RECENT_FOCUS"
  | "BEFORE_READING"
  | "RECOMMENDED";

export interface LibraryHomeBookItem {
  bookId?: number;
  isbn13?: string;
  title: string;
  author: string;
  coverUrl: string | null;
}

export interface LibraryHomeSection {
  type: LibraryHomeSectionType;
  title: string;
  items: LibraryHomeBookItem[];
}

export interface LibrarySearchHomeResult {
  sections: LibraryHomeSection[];
}

export interface LibrarySearchHomeResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: LibrarySearchHomeResult;
}

export async function getLibrarySearchHome(): Promise<LibrarySearchHomeResult> {
  const response = await api.get<LibrarySearchHomeResponse>(
    "/api/v1/books/search/library/home",
  );

  return response.data.result;
}


export interface GlobalHomeBookItem {
  isbn13: string;
  title: string;
  author: string;
  coverImageUrl: string | null;
  publisher: string;
  rank: number;
}

export interface BestsellersResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: GlobalHomeBookItem[];
}

export async function getBestsellers(): Promise<GlobalHomeBookItem[]> {
  const response = await api.get<BestsellersResponse>(
    "/api/v1/books/bestsellers",
  );

  return response.data.result ?? [];
}

export async function getRecommendations(): Promise<GlobalHomeBookItem[]> {
  const response = await api.get<BestsellersResponse>(
    "/api/v1/books/recommendations",
  );

  return response.data.result ?? [];
}