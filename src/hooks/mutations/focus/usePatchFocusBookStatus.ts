import { useMutation, useQueryClient } from "@tanstack/react-query";

import { patchLibraryBookStatus } from "../../../api/library";
import type { BookStatusType } from "../../../types/libraryInfo/library";

type PatchFocusBookStatusParams = {
  bookId: number;
  readingStatus: BookStatusType;
};

export function usePatchFocusBookStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PatchFocusBookStatusParams) =>
      patchLibraryBookStatus(params),
    onSuccess: async (_data, { bookId }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["focus", "home"] }),
        queryClient.invalidateQueries({
          queryKey: ["focus", "libraryBooks"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["library", "statusBooks"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["library", "statusCounts"],
        }),
        queryClient.invalidateQueries({ queryKey: ["libraryBooks"] }),
        queryClient.invalidateQueries({
          queryKey: ["bookDetail", "bookId", bookId],
        }),
        queryClient.invalidateQueries({ queryKey: ["bookTimeline"] }),
      ]);
    },
  });
}
