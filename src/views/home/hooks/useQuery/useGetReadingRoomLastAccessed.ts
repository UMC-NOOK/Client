//임시 (리딩룸)
import { useQuery } from '@tanstack/react-query';
import { getReadingRoomLastAccessed } from '../../apis/lastAccessed';

export const useGetReadingRoomLastAccessed = () =>
  useQuery({
    queryKey: ['reading-room', 'lastAccessed'],
    queryFn: getReadingRoomLastAccessed,
  });
