import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postFocusEnd } from "../../../api/focus";
import type { FocusEndRequest } from "../../../types/focus/focus";

export function useEndFocus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FocusEndRequest) => postFocusEnd(data),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["focus", "home"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["bookTimeline"],
        }),
      ]);
    },
  });
}
