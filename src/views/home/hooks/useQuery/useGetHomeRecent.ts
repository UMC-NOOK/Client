//src/view/home/hooks/useQuery/useHomeRecent.ts
import { useQuery } from '@tanstack/react-query';
import { getHomeRecentRecord } from '../../apis/recent';

export const useGetHomeRecent = () =>
  useQuery({ queryKey: ['home','recentRecord'], queryFn: getHomeRecentRecord, staleTime: 30_000 });
