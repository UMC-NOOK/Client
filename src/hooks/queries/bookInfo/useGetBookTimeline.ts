import { getBookTimeline } from "../../../api/bookInfo";
import { useQuery } from "@tanstack/react-query";

export function useGetBookTimeline(libraryId: number | null | undefined) {
  return useQuery({
    queryKey: ["bookTimeline", libraryId],
    queryFn: () => getBookTimeline(libraryId as number),
    enabled: !!libraryId,
  });
}
