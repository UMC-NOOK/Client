import { useQuery } from '@tanstack/react-query';
import { getWeeklyBooks, WeeklyItem } from '../../apis/getWeekly';

export default function useGetWeeklyBooks() {
  return useQuery<WeeklyItem[]>({
    queryKey: ['bookshelf', 'weekly'],
    queryFn: getWeeklyBooks,
    staleTime: 1000 * 60, // 1분
  });
}
