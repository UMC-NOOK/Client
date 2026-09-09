import {
  getBookTimelineAll,
  getBookTimelineAllDetail,
} from "../../../api/history";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

/**
 * 서재 도서 타임라인 조회
 *
 * GET /api/v1/library/{libraryId}/timeline
 */

export function useGetBookTimelineAll(libraryId: number | null | undefined) {
  return useInfiniteQuery({
    queryKey: ["bookTimeline", "infinite", libraryId],
    queryFn: ({ pageParam }) =>
      getBookTimelineAll(libraryId as number, pageParam),

    initialPageParam: null as string | null,

    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNext) {
        return undefined;
      }

      return lastPage.nextCursor ?? undefined;
    },

    enabled: libraryId != null,
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
