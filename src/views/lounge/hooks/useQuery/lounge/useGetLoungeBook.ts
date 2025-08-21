import { useQuery } from '@tanstack/react-query';
import LoungeBookListGet, { LoungeBookListGetProps } from '../../../apis/lounge/lounge-book/LoungeBookListGet';
import { loungeQueryKeys, LoungeSection } from '../../../apis/lounge/types/lounge-types';

const useGetLoungeBook = ({ mallType }: LoungeBookListGetProps) => {
    return useQuery({
        queryKey: loungeQueryKeys.books( mallType),
        queryFn: () => LoungeBookListGet({ mallType}),
        staleTime: 0,
        enabled: !!mallType,
        select : (data) => {
            const sections = data.result.sections;
            return{
                sections,
                newSections: sections.find((s:LoungeSection) => s.sectionId === 'new'), //없으면 undefined
                bestSections: sections.filter((s:LoungeSection) => s.sectionId === 'best'),
                favoriteSections: sections.find((s:LoungeSection) => s.sectionId === 'favorite_best'),
            }
        }
    });
};

export default useGetLoungeBook;
