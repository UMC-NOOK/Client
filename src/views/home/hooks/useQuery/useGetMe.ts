import { useQuery } from '@tanstack/react-query';
import { getMe } from '../../apis/user';

export const useGetMe = () =>
  useQuery({ queryKey: ['me'], queryFn: getMe, staleTime: 60_000 });
