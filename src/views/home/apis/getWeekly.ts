import instance from '../../../apis/instance';

export type WeeklyItem = {
  day: number; // 0~6
  bookInfo?: {
    bookId: number;
    title: string;
    thumbnailUrl: string;
  } | null;
};

export type WeeklyResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: WeeklyItem[];
};

export async function getBooks(): Promise<WeeklyItem[]> {
  const { data } = await instance.get<WeeklyResponse>('/api/bookshelf/weekly');
  if (!data?.isSuccess || !Array.isArray(data.result)) return [];
  return data.result;
}
