import { useQuery } from '@tanstack/react-query';
import { getHomeGoals } from '../../apis/goals';

export const useGetHomeGoals = () =>
  useQuery({
    queryKey: ['home', 'goals'],
    queryFn: getHomeGoals,
    staleTime: 60_000,
  });
