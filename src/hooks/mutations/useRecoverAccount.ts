import { useMutation } from "@tanstack/react-query";
import { recoverAccount } from "../../api/auth";

export function useRecoverAccount() {
  return useMutation({
    mutationFn: recoverAccount,
  });
}
