// useGetHomeRecent.ts
import { useQuery } from '@tanstack/react-query';
import instance from '../../../../apis/instance';

export type HomeRecent = {
  bookId: number;
  title: string;
  author: string;
  coverImgUrl: string;
};

export const useGetHomeRecent = () =>
  useQuery<HomeRecent | undefined>({
    queryKey: ['home', 'recentRecord'],
    queryFn: async () => {
      const { data } = await instance.get<{
        isSuccess: boolean; code: string; message: string; result: HomeRecent | null;
      }>('/api/records/recent');
      return data?.isSuccess ? data.result ?? undefined : undefined;
    },
    staleTime: 30_000,
  });
