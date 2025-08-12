import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchProfile } from '../../apis/profile';
import type { PatchProfileParams } from '../../type/profile';

export const usePatchProfile = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: PatchProfileParams) => patchProfile(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};
