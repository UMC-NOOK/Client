import { useQuery } from '@tanstack/react-query';
import { getHomeInsight } from '../../apis/insight';

export const useGetHomeInsight = () =>
  useQuery({ queryKey: ['home','insight'], queryFn: getHomeInsight, staleTime: 60_000 });
