// src/views/search/hooks/useMutation/useDeleteRecentQuery.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRecentQuery } from '../../apis/search';

export const useDeleteRecentQuery = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (recentQueryId: number) => deleteRecentQuery(recentQueryId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['search', 'recentQueries'] });
    },
  });
};
