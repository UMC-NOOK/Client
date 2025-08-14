import { useQuery } from '@tanstack/react-query';
import themeFetch from '../../../apis/private-reading-room/themeFetch';
import type { themeFetchProps } from '../../../apis/private-reading-room/themeFetch';

const useGetTheme = ({ roomId }: themeFetchProps) => {
  return useQuery({
    queryKey: ['theme', roomId],
    queryFn: () => themeFetch({ roomId }),
    staleTime: 30000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export default useGetTheme;
