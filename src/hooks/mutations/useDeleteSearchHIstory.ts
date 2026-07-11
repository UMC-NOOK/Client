import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSearchHistory, type SearchType } from "../../api/search";

export function useDeleteSearchHistory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ type, keyword }: { type: SearchType; keyword: string }) =>
      deleteSearchHistory(type, keyword),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["searchHistories", variables.type],
      });
    },
  });
}
