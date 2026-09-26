import { api } from "./axios";
import type BaseApiResponse from "../types/BaseApiResponse";
import type {
  FocusBookStatus,
  FocusEndRequest,
  FocusEndResult,
  FocusHomeResult,
  FocusLibraryBooksResult,
  FocusLibrarySort,
  FocusStartRequest,
  FocusStartResult,
} from "../types/focus/focus";

const FOCUS_BASE = "/api/v1/focuses";
const LIBRARY_BOOKS_ENDPOINT = "/api/v1/library/books";

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

// 포커스 도서 선택 화면 목록/정렬 조회. report 도메인의 getLibraryBooks(record.ts)는
// 서버 enum과 어긋난 SortOption을 쓰고 있어 재사용하지 않는다.
export async function getFocusLibraryBooks(params: {
  sort: FocusLibrarySort;
  cursor?: string;
  size?: number;
}): Promise<FocusLibraryBooksResult> {
  const response = await api.get<BaseApiResponse<FocusLibraryBooksResult>>(
    LIBRARY_BOOKS_ENDPOINT,
    { params },
  );

  if (response.data?.result === undefined) {
    throw new Error(`응답 result가 없습니다: ${LIBRARY_BOOKS_ENDPOINT}`);
  }

  return response.data.result;
}

export async function postFocusStart(
  data: FocusStartRequest,
): Promise<FocusStartResult> {
  const response = await api.post<BaseApiResponse<FocusStartResult>>(
    `${FOCUS_BASE}/start`,
    data,
  );

  if (response.data?.result === undefined) {
    throw new Error("응답 result가 없습니다: /api/v1/focuses/start");
  }

  return response.data.result;
}

export async function postFocusEnd(
  data: FocusEndRequest,
): Promise<FocusEndResult> {
  const response = await api.post<BaseApiResponse<FocusEndResult>>(
    `${FOCUS_BASE}/end`,
    data,
  );

  if (response.data?.result === undefined) {
    throw new Error("응답 result가 없습니다: /api/v1/focuses/end");
  }

  return response.data.result;
}
