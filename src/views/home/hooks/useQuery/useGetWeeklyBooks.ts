import { useQuery } from '@tanstack/react-query';
import { getBooks, type WeeklyItem } from '../../apis/getWeekly';

export default function useGetWeeklyBooks() {
  return useQuery<WeeklyItem[]>({
    queryKey: ['bookshelf', 'weekly'],
    queryFn: getBooks,
    staleTime: 1000 * 60,
  });
}
