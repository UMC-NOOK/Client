import { useMutation, useQueryClient } from "@tanstack/react-query";

import { patchProfileImage } from "../../../api/myPage";

export function usePatchProfileImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchProfileImage,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["auth", "me"] }),
        queryClient.invalidateQueries({ queryKey: ["users", "me"] }),
      ]);
    },
  });
}
