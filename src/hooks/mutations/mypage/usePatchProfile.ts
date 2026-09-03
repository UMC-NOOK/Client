import { useMutation, useQueryClient } from "@tanstack/react-query";

import { patchProfile } from "../../../api/myPage";

export function usePatchProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchProfile,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["auth", "me"] }),
        queryClient.invalidateQueries({ queryKey: ["users", "me"] }),
      ]);
    },
  });
}
