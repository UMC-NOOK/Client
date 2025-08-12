import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchHomeGoals } from '../../apis/goals';
import type { GoalRequestDTO } from '../../type/home';

export const usePatchHomeGoals = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: GoalRequestDTO) => patchHomeGoals(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['home','goals'] });
    },
  });
};


