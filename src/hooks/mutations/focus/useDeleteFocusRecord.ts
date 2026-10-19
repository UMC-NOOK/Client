import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFocusRecord } from "../../../api/focus";

type DeleteRecordVariables = {
  focusId: number;
  libraryId?: number;
};

export function useDeleteFocusRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ focusId }: DeleteRecordVariables) =>
      deleteFocusRecord(focusId),

    onSuccess: (_, { libraryId }) => {
      queryClient.invalidateQueries({
        queryKey: ["bookTimeline", "infinite", libraryId],
      });
    },
  });
}
