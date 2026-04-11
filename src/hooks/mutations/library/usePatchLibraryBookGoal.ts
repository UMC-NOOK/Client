import { useMutation, useQueryClient } from "@tanstack/react-query";
import  { patchLibraryBookGoal } from "../../../api/library";

export function usePatchLibraryBookGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchLibraryBookGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["library", "bookGoal"] });
    },
  });
}