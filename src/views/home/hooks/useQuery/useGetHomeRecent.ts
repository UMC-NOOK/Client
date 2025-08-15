import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getHomeRecentRecord } from '../../apis/recent';

export const useGetHomeRecent = () =>
  useQuery({
    queryKey: ['home', 'recentRecord'],
    queryFn: getHomeRecentRecord,
    staleTime: 30_000,
    refetchOnWindowFocus: false,    // 포커스 전환 시 재요청 방지
    retry: (count, error) => {      // 4xx면 재시도 X, 그 외(네트워크/5xx)만 2회
      if (axios.isAxiosError(error)) {
        const s = error.response?.status;
        if (s && s >= 400 && s < 500) return false;
      }
      return count < 2;
    },
    select: (data) => data ?? null,
  });
