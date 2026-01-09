import { sentenceDeleteFetch } from '../../../apis/read-note-edit/sentenceEdit';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteSentence = (recordId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => sentenceDeleteFetch(recordId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['sentenceList'] });
    },
  });
};

export default useDeleteSentence;
