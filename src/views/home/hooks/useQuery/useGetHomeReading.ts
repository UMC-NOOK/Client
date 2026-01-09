// src/views/home/hooks/useQuery/useGetHomeReading.ts
import { useQuery } from '@tanstack/react-query';
import { getHomeReadingNow } from '../../apis/reading';

export type HomeReading = {
  bookId: number;
  title: string;
  author: string;
  coverImgUrl: string; 
};

export const useGetHomeReading = () =>
  useQuery<HomeReading | undefined>({
    queryKey: ['home', 'readingNow'],
    queryFn: getHomeReadingNow,
    staleTime: 30_000,
  });
