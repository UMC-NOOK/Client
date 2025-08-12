import instance from '../../../apis/instance';
import type { ApiEnvelope, ReadingNowDTO } from '../../home/type/home';

export const getHomeReadingNow = async () => {
  const { data } = await instance.get<ApiEnvelope<ReadingNowDTO>>('/api/bookshelf/reading');
  return data.result;
};
