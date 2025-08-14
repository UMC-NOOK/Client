import { useQuery } from '@tanstack/react-query';
import memberListFetch from '../../../apis/private-reading-room/memberListFetch';
import type { memberListFetchProps } from '../../../apis/private-reading-room/memberListFetch';

const useGetMemberList = ({ roomId }: memberListFetchProps) => {
  return useQuery({
    queryKey: ['memberListData'],
    queryFn: () => memberListFetch({ roomId }),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export default useGetMemberList;
