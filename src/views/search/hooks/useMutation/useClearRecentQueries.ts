// src/views/search/hooks/useMutation/useClearRecentQueries.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clearRecentQueries } from '../../apis/search';

export const useClearRecentQueries = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: clearRecentQueries,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['search', 'recentQueries'] });
    },
  });
};
