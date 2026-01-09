import sentencePostFetch from '../../../apis/read-note-edit/sentenceSave';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePostSentence = (bookId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { page: string | null; content: string }) =>
      sentencePostFetch(bookId, payload.page, payload.content),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['sentenceList'] });
    },
  });
};

export default usePostSentence;
