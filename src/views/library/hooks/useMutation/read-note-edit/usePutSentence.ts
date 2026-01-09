import { sentencePutFetch } from '../../../apis/read-note-edit/sentenceEdit';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePutSentence = (recordId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { page: string; content: string }) =>
      sentencePutFetch(recordId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['sentenceList'] });
    },
  });
};

export default usePutSentence;
