import sentenceListFetch from '../../../apis/read-note/sentenceList';
import { useQuery } from '@tanstack/react-query';

const useGetSentenceList = (bookId: string | undefined) => {
  return useQuery({
    queryKey: ['sentenceList', bookId],
    queryFn: () => sentenceListFetch(bookId),
    enabled: !!bookId,
  });
};

export default useGetSentenceList;
