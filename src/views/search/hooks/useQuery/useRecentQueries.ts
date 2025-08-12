// src/views/search/hooks/useQuery/useRecentQueries.ts
import { useQuery } from '@tanstack/react-query';
import { getRecentQueries } from '../../apis/search';

export const useRecentQueries = () =>
  useQuery({
    queryKey: ['search', 'recentQueries'],
    queryFn: getRecentQueries,
    staleTime: 30_000,
  });
