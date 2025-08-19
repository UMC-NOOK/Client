import { commentDeleteFetch } from '../../../apis/read-note-edit/commentEdit';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteComment = (commentId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => commentDeleteFetch(commentId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['sentenceList'] });
    },
  });
};

export default useDeleteComment;
