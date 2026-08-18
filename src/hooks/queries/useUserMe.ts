import { useQuery } from "@tanstack/react-query";

import { getUserMe } from "../../api/user";

export function useUserMe() {
  return useQuery({
    queryKey: ["users", "me"],
    queryFn: getUserMe,
  });
}
