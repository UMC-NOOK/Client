import instance from '../../../apis/instance';
import type { ApiEnvelope, CategoryResultDTO } from '../../home/type/home';

export const getHomeCategories = async () => {
  const { data } = await instance.get<ApiEnvelope<CategoryResultDTO>>('/api/users/categories');
  return data.result.categories; // [{ categoryName, count }]
};
