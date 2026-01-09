import { useQuery } from '@tanstack/react-query';
import { getHomeMonthlyBooks } from '../../apis/monthly';

export const useGetHomeMonthlyBooks = (yearMonth: string) =>
  useQuery({
    queryKey: ['home','monthlyBooks', yearMonth],
    queryFn: () => getHomeMonthlyBooks(yearMonth),
    enabled: !!yearMonth,
  });
