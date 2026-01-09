// src/views/home/apis/reading.ts
import instance from '../../../apis/instance';
import { HomeReading } from '../hooks/useQuery/useGetHomeReading';

export async function getHomeReadingNow(): Promise<HomeReading | undefined> {
  const { data } = await instance.get<{
    isSuccess: boolean;
    code: string;
    message: string;
    result: HomeReading | null;
  }>('/api/bookshelf/reading');

  if (!data.isSuccess || !data.result) return undefined;
  return data.result;
}
