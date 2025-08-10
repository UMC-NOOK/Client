import instance from '../../../apis/instance';
import type { ApiEnvelope, RecentRecordDTO } from '../../home/type/home';

export const getHomeRecentRecord = async () => {
  const { data } = await instance.get<ApiEnvelope<RecentRecordDTO>>('/api/records/recent');
  return data.result;
};
