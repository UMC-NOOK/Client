import { useQuery } from '@tanstack/react-query';
import { getHomeCategories } from '../../apis/categories';

export const useGetHomeCategories = () =>
  useQuery({ queryKey: ['home','categories'], queryFn: getHomeCategories, staleTime: 60_000 });
