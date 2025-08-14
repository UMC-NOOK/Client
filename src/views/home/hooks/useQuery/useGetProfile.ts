import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../../apis/profile';

export const useGetProfile = () =>
  useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: 60_000,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
  });
