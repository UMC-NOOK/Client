import { useQuery } from "@tanstack/react-query";
import { getLibraryFocusMonthly } from "../../../api/library";

export function useLibraryFocusMonthly(yearMonth: string) {
  return useQuery({
    queryKey: ["library", "focusMonthly", yearMonth],
    queryFn: () => getLibraryFocusMonthly({ yearMonth }),
    enabled: Boolean(yearMonth),
  });
}