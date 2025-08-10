import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putNickname } from '../../apis/profile';

export const useUpdateNickname = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { nickname: string }) => putNickname(payload.nickname),
    onSuccess: () => {
      // 닉네임은 /api/users/me 에 반영되므로, 헤더/홈 등에서 쓰는 me 캐시 무효화
      qc.invalidateQueries({ queryKey: ['me'] });
    },
  });
};
