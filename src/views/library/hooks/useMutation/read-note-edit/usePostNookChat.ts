// usePostNookChat.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { nookChatPostFetch } from '../../../apis/read-note-edit/nookChat';
import {
  NookChatSendRequest,
  NookChatSendResponse,
  getNookChatResponse,
  NookChat,
} from '../../../types/read-note-edit/nookChat';

const usePostNookChat = (bookId: number) => {
  const qc = useQueryClient();
  const qk = ['nookChat', bookId]; // 리스트 쿼리와 동일하게 유지

  return useMutation({
    mutationFn: (message: string) => {
      const data: NookChatSendRequest = { bookId, message };
      return nookChatPostFetch(data); // Promise<NookChatSendResponse | undefined>
    },

    // 1) 요청 직전: 캐시에 임시 메시지 push
    onMutate: async (message: string) => {
      await qc.cancelQueries({ queryKey: qk });

      const previous = qc.getQueryData<getNookChatResponse>(qk);
      // 음수 임시 ID(서버가 양수만 쓴다고 가정)
      const tempId = -Math.floor(Math.random() * 1_000_000_000);

      qc.setQueryData<getNookChatResponse>(qk, (old) => {
        const base: getNookChatResponse = old ?? {
          isSuccess: true,
          code: '',
          message: '',
          result: [],
        };

        const optimistic: NookChat = {
          chatRecordId: tempId,
          chatType: 'USER',
          message,
          createdDate: new Date().toISOString(),
        };

        return {
          ...base,
          result: [...(base.result ?? []), optimistic],
        };
      });

      return { previous, tempId };
    },

    // 2) 실패 시 롤백
    onError: (_err, _msg, ctx) => {
      if (ctx?.previous) qc.setQueryData(qk, ctx.previous);
    },

    // 3) 성공 시 임시 메시지를 서버 결과로 교체
    onSuccess: (server, _msg, ctx) => {
      if (!server?.result) return; // 서버가 undefined면 invalidate로 동기화
      const serverRow = server.result; // NookChat (단일)

      qc.setQueryData<getNookChatResponse>(qk, (old) => {
        const base: getNookChatResponse = old ?? {
          isSuccess: true,
          code: '',
          message: '',
          result: [],
        };

        const list = [...(base.result ?? [])];
        const idx = list.findIndex((m) => m.chatRecordId === ctx?.tempId);

        if (idx >= 0) {
          list[idx] = serverRow;
        } else {
          // 혹시 임시 항목이 없으면 맨 뒤에 추가
          list.push(serverRow);
        }

        return { ...base, result: list };
      });
    },

    // 4) 최종 동기화(선택): 서버의 최신(예: SYSTEM 응답 등)까지 맞추고 싶다면 유지
    onSettled: () => {
      qc.invalidateQueries({ queryKey: qk });
    },
  });
};

export default usePostNookChat;
