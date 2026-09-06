import {
  getBookTimelineAll,
  getBookTimelineAllDetail,
} from "../../../api/history";
import { useQuery } from "@tanstack/react-query";

export function useGetBookTimelineAll(libraryId: number | null | undefined) {
  return useQuery({
    queryKey: ["bookTimeline", libraryId],
    queryFn: () => getBookTimelineAll(libraryId as number),
    enabled: !!libraryId,
  });
}

export function useGetBookTimelineAllDetail(
  libraryId: number | null | undefined,
  timelineId: number | null | undefined,
) {
  return useQuery({
    queryKey: ["bookTimelineDetail", libraryId, timelineId],
    queryFn: () => {
      if (libraryId == null || timelineId == null) {
        throw new Error("libraryId와 timelineId가 필요합니다.");
      }

      return getBookTimelineAllDetail(libraryId, timelineId);
    },
    enabled: libraryId != null && timelineId != null,
  });
}
