//src/view/home/hooks/useQuery/useHomeReading.ts

import { useQuery } from '@tanstack/react-query';
import { getHomeReadingNow } from '../../apis/reading';

export const useGetHomeReading = () =>
  useQuery({
    queryKey: ['home', 'readingNow'],
    queryFn: getHomeReadingNow, 
    staleTime: 30_000,
  });
