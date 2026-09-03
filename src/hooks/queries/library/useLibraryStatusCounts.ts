import { useQuery } from "@tanstack/react-query";

import { getLibraryStatusCounts } from "../../../api/library";

export function useLibraryStatusCounts() {
  return useQuery({
    queryKey: ["library", "statusCounts"],
    queryFn: getLibraryStatusCounts,
  });
}
