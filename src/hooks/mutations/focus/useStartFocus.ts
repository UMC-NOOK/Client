import { useMutation } from "@tanstack/react-query";

import { postFocusStart } from "../../../api/focus";
import type { FocusStartRequest } from "../../../types/focus/focus";

export function useStartFocus() {
  return useMutation({
    mutationFn: (data: FocusStartRequest) => postFocusStart(data),
  });
}
