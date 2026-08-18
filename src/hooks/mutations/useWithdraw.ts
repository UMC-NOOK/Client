import { useMutation } from "@tanstack/react-query";

import { withdraw } from "../../api/auth";

export function useWithdraw() {
  return useMutation({
    mutationFn: withdraw,
  });
}
