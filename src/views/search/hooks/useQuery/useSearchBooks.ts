// src/views/search/hooks/useQuery/useSearchBooks.ts
import { useQuery } from '@tanstack/react-query';
import { getSearchBooks, type SearchResult } from '../../apis/search';

export const useSearchBooks = (args: { query: string; page?: number }) => {
  const { query, page = 1 } = args;

  return useQuery<SearchResult>({
    queryKey: ['search', 'books', query, page],
    queryFn: () => getSearchBooks({ query, page }),
    enabled: !!query,
    // v5 대체: 이전 페이지 데이터 유지
    placeholderData: (prev) => prev,
    staleTime: 30_000,
  });
};
