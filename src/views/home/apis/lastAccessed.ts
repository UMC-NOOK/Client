import instance from '../../../apis/instance';
import type { ApiEnvelope, LastAccessedReadingRoomResponseDTO } from '../type/readingroom';

export const getReadingRoomLastAccessed = async () => {
  const { data } = await instance.get<ApiEnvelope<LastAccessedReadingRoomResponseDTO>>(
    '/api/reading-rooms/last-accessed'
  );
  return data.result; // null | { roomId, name, ... }
};
