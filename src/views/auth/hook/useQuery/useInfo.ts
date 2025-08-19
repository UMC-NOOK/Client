import { useQuery } from '@tanstack/react-query';
import myInfo from '../../apis/myInfo';

const useInfo = () => {
    return useQuery({
        queryKey:['myInfo'],
        queryFn: () => myInfo(),
        staleTime: 0,
        select : (data) => {
            const info = data.result;
            return info;
        }
    });
};

export default useInfo;
