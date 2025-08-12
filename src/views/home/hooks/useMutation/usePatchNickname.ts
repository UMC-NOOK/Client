import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchNickname } from '../../apis/user';

export const usePatchNickname = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { nickname: string }) => patchNickname(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['me'] });
    },
  });
};
