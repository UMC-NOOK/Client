import { nookChatFetch } from '../../../apis/read-note-edit/nookChat.ts';
import { useQuery } from '@tanstack/react-query';

const useGetNookChat = (bookId: number) => {
  return useQuery({
    queryKey: ['nookChat', bookId],
    queryFn: () => nookChatFetch(bookId),
    enabled: !!bookId,
  });
};

export default useGetNookChat;
