import instance from '../../../apis/instance';
import type { ApiEnvelope, LastAccessedReadingRoomResponseDTO } from '../type/readingroom';

export const getReadingRoomLastAccessed = async (): Promise<LastAccessedReadingRoomResponseDTO | null> => {
  try {
    const { data } = await instance.get<ApiEnvelope<LastAccessedReadingRoomResponseDTO>>(
      '/api/reading-rooms/last-accessed'
    );
    return (data?.result ?? null) as LastAccessedReadingRoomResponseDTO | null;
  } catch (err: any) {
    const status = err?.response?.status;
    if (status === 404) return null;
    // 그 외(401/403/5xx)는 진짜 에러로 던지기
    throw err;
  }
};
