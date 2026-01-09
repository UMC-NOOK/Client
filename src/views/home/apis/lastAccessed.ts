import instance from '../../../apis/instance';
import type { ApiEnvelope, LastAccessedReadingRoomResponseDTO } from '../type/readingroom';

export const getReadingRoomLastAccessed = async (): Promise<LastAccessedReadingRoomResponseDTO | null> => {
  const res = await instance.get<ApiEnvelope<LastAccessedReadingRoomResponseDTO>>(
    '/api/reading-rooms/last-accessed',
    { validateStatus: (s) => (s >= 200 && s < 300) || s === 404 }
  );
  if (res.status === 404) return null;
  return res.data?.result ?? null;
};
