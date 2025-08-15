import instance from '../../../apis/instance';
import type { ApiEnvelope, RecentRecordDTO } from '../../home/type/home';

export const getHomeRecentRecord = async (): Promise<RecentRecordDTO | null> => {
  const res = await instance.get<ApiEnvelope<RecentRecordDTO>>('/api/records/recent', {
    // 404를 에러로 던지지 않고 여기서 잡아 null로 바꿈
    validateStatus: (s) => (s >= 200 && s < 300) || s === 404,
  });
  if (res.status === 404) return null;
  return res.data?.result ?? null;
};
