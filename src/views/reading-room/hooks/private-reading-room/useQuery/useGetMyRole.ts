import { useQuery } from '@tanstack/react-query';
import myRoleFetch from '../../../apis/private-reading-room/myRoleFetch';
import type { myRoleFetchProps } from '../../../apis/private-reading-room/myRoleFetch';

const useGetMyRole = ({ roomId }: myRoleFetchProps) => {
  return useQuery({
    queryKey: ['myRole'],
    queryFn: () => myRoleFetch({ roomId }),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export default useGetMyRole;
