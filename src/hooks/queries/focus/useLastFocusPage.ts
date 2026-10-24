import { useQuery } from "@tanstack/react-query";

import { getLastFocusPage } from "../../../api/focus";

export function useLastFocusPage(libraryId: number | null | undefined) {
  return useQuery({
    queryKey: ["bookTimeline", "lastFocusPage", libraryId],
    queryFn: () => getLastFocusPage(libraryId!),
    enabled: libraryId != null,
  });
}
