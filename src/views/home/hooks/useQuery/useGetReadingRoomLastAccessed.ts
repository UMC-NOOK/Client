import { useQuery } from '@tanstack/react-query';
import { getReadingRoomLastAccessed } from '../../apis/lastAccessed';

export const useGetReadingRoomLastAccessed = () =>
  useQuery({
    queryKey: ['home', 'readingRoom', 'lastAccessed'],
    queryFn: getReadingRoomLastAccessed,
    retry: (failureCount, error: any) => {
      const status = error?.response?.status;
      if (!status) return failureCount < 1;     // 네트워크 등: 1회 재시도
      return status >= 500 && failureCount < 1; // 5xx만 1회 재시도
    },
    staleTime: 30_000,
  });
