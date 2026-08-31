import { useQuery } from "@tanstack/react-query";

import { getRecentView } from "../../../api/myPage";

export function useRecentView() {
  return useQuery({
    queryKey: ["books", "recently-viewed"],
    queryFn: getRecentView,
  });
}
