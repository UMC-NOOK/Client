import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postFocusEnd } from "../../../api/focus";
import type { FocusEndRequest } from "../../../types/focus/focus";

export function useEndFocus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FocusEndRequest) => postFocusEnd(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["focus", "home"],
      }),
  });
}
