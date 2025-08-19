import commentPostFetch from '../../../apis/read-note-edit/commentSave';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePostComment = (bookId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      parentRecordId,
      content,
    }: {
      parentRecordId: number | null;
      content: string;
    }) => commentPostFetch(bookId, parentRecordId, content),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['sentenceList'] });
    },
  });
};

export default usePostComment;
