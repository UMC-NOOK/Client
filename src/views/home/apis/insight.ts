import instance from '../../../apis/instance';
import type { ApiEnvelope, BooksInsightDTO } from '../../home/type/home';

export const getHomeInsight = async () => {
  const { data } = await instance.get<ApiEnvelope<BooksInsightDTO>>('/api/bookshelf/insight');
  return data.result;
};
