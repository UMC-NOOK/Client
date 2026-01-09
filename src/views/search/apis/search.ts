import instance from '../../../apis/instance';

export type RecentQuery = { recentQueryId: number; query: string };
export type RecentQueriesResponse = { recentQueries: RecentQuery[] };

export async function getRecentQueries() {
  const { data } = await instance.get('/api/search/recentQueries');   // <-- fix
  return (data.result ?? data) as RecentQueriesResponse;
}

export async function deleteRecentQuery(recentQueryId: number) {
  const { data } = await instance.delete(`/api/search/recentQueries/${recentQueryId}`); // <-- fix
  return data.result ?? true;
}

export async function clearRecentQueries() {
  const { data } = await instance.delete('/api/search/recentQueries'); // <-- ok
  return data.result ?? true;
}

export type SearchBook = {
  bookId: number; isbn13: string; title: string; author: string;
  publisher: string; coverImageUrl: string; publicationDate: string; mallType: string;
};
export type SearchPagination = { currentPage: number; pageSize: number; totalItems: number; totalPages: number };
export type SearchResult = { books: SearchBook[]; pagination: SearchPagination };

/** GET /api/search/books */
export async function getSearchBooks(params: { query: string; page?: number }) {
  const { query, page = 1 } = params; // 서버가 1-based면 1, 0-based면 0으로 맞추세요
  const { data } = await instance.get('/api/search/books', { params: { query, page } });
  return (data.result ?? data) as SearchResult;
}
