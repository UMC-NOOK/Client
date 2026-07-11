import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRecord } from "../../../api/record";

export function useDeleteRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recordId: number) => deleteRecord(recordId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["records"],
      });
    },
  });
}
