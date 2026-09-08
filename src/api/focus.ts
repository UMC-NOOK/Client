import { api } from "./axios";
import type BaseApiResponse from "../types/BaseApiResponse";
import type { FocusBookStatus, FocusHomeResult } from "../types/focus/focus";

const FOCUS_BASE = "/api/v1/focuses";

export async function getFocusHome(params: {
  status: FocusBookStatus;
  cursor?: number;
  size?: number;
}): Promise<FocusHomeResult> {
  const response = await api.get<BaseApiResponse<FocusHomeResult>>(
    `${FOCUS_BASE}/home`,
    { params },
  );

  if (response.data?.result === undefined) {
    throw new Error("응답 result가 없습니다: /api/v1/focuses/home");
  }

  return response.data.result;
}
