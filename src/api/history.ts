import { api } from "./axios";

import type { BaseApiResponse } from "../types/index.type";
import type {
  TimelinePreview,
  TimelineDetailResponse,
} from "../types/bookInfo/history.type";

const LIBRARY_ENDPOINT = "/api/v1/library";

/**
 * 서재 도서 타임라인 조회
 *
 * GET /api/v1/library/{libraryId}/timeline
 */
export async function getBookTimelineAll(
  libraryId: number,
  cursor: string | null = null,
): Promise<TimelinePreview> {
  const response = await api.get<BaseApiResponse<TimelinePreview>>(
    `${LIBRARY_ENDPOINT}/${libraryId}/timeline`,
    {
      params: cursor ? { cursor } : undefined,
    },
  );

  return response.data.result;
}

/**
 * 서재 도서 타임라인 상세 조회
 *
 * GET /api/v1/library/{libraryId}/timeline/{timelineId}
 */
export async function getBookTimelineAllDetail(
  libraryId: number,
  timelineId: number,
): Promise<TimelineDetailResponse> {
  const response = await api.get<BaseApiResponse<TimelineDetailResponse>>(
    `${LIBRARY_ENDPOINT}/${libraryId}/timeline/${timelineId}`,
  );

  return response.data.result;
}
