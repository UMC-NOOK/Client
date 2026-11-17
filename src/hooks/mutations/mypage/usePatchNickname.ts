import { useMutation, useQueryClient } from "@tanstack/react-query";

import { patchNickname } from "../../../api/myPage";

export function usePatchNickname() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchNickname,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["auth", "me"] }),
        queryClient.invalidateQueries({ queryKey: ["users", "me"] }),
      ]);
    },
  });
}
