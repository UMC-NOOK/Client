// src/views/search/apis/search.ts
import instance from '../../../apis/instance';

export type RecentQuery = {
  recentQueryId: number;
  query: string;
};
export type RecentQueriesResponse = {
  recentQueries: RecentQuery[];
};

export async function getRecentQueries() {
  const { data } = await instance.get('/api/searchQueries');
  // 백엔드 공통 포맷 { isSuccess, code, message, result }
  return (data.result ?? data) as RecentQueriesResponse;
}

export async function deleteRecentQuery(recentQueryId: number) {
  const { data } = await instance.delete(`/api/searchQueries/${recentQueryId}`);
  return data.result ?? true;
}

export async function clearRecentQueries() {
  const { data } = await instance.delete('/api/search/recentQueries');
  return data.result ?? true;
}

// -------- 책 검색 --------
export type SearchBook = {
  bookId: number;
  isbn13: string;
  title: string;
  author: string;
  publisher: string;
  coverImageUrl: string;
  publicationDate: string;
  mallType: string;
};

export type SearchPagination = {
  currentPage: number; // swagger: 기본 1 페이지 기반
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type SearchResult = {
  books: SearchBook[];
  pagination: SearchPagination;
};

/**
 * GET /api/search/books
 * params: { query, page }
 */
export async function getSearchBooks(params: { query: string; page?: number }) {
  const { query, page = 1 } = params;
  const { data } = await instance.get('/api/search/books', {
    params: { query, page },
  });
  return (data.result ?? data) as SearchResult;
}
