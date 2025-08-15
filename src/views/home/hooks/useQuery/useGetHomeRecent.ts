import { useQuery } from '@tanstack/react-query';
import { getHomeRecentRecord } from '../../apis/recent';

export const useGetHomeRecent = () =>
  useQuery({
    queryKey: ['home', 'recentRecord'],
    queryFn: getHomeRecentRecord,
    staleTime: 30_000,
    select: (data) => data ?? null, // null 명시
  });

