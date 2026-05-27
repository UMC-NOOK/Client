import { useQuery } from "@tanstack/react-query";
import { getAuthMe } from "../../api/auth";

export function useAuthMe() {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: getAuthMe,
  });
}
