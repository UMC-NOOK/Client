import { api } from "./axios";

import type { BaseApiResponse } from "../types/index.type";
import type {
  timelinePreview,
  TimelineDetailResponse,
} from "../types/bookInfo/timeline.type";

const LIBRARY_ENDPOINT = "/api/v1/library";

/**
 * 서재 도서 타임라인 조회
 *
 * GET /api/v1/library/{libraryId}/timeline
 */
export async function getBookTimelineAll(
  libraryId: number,
): Promise<timelinePreview> {
  const response = await api.get<BaseApiResponse<timelinePreview>>(
    `${LIBRARY_ENDPOINT}/${libraryId}/timeline`,
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
