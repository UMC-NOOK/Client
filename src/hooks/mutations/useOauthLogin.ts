import { useMutation } from "@tanstack/react-query";
import { oauthLogin } from "../../api/auth";

export function useOauthLogin() {
  return useMutation({
    mutationFn: oauthLogin,
  });
}
