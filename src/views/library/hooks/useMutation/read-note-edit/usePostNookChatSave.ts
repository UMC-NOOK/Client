import { nookChatMessageSaveFetch } from '../../../apis/read-note-edit/nookChat';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePostNookChatSave = (bookId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (messageId: number) => nookChatMessageSaveFetch(messageId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['nookChat', bookId] });
    },
  });
};

export default usePostNookChatSave;
