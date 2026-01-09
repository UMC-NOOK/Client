import { commentPutFetch } from '../../../apis/read-note-edit/commentEdit';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePutComment = (commentId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => commentPutFetch(commentId, content),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['sentenceList'] });
    },
  });
};

export default usePutComment;
