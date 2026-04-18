import { api } from "./axios";
import type BaseApiResponse from "../types/BaseApiResponse";

import type {
   LibraryBook,
   LibraryBookGoal,
   LibraryDateFocus,
   BookStatusType,
   LibraryStatusBook,
   PatchBookGoal,
   LibraryFocusMonthly,
   LibraryBooksMonthly,
   DateToggleYear,
} from "../types/libraryInfo/library";

const LIBRARY_BASE = "/api/v1/library";

export async function libraryGet<T>(
  url: string,
  params?: Record<string, string | number | undefined>,
): Promise<T> {
  const response = await api.get<BaseApiResponse<T>>(`${LIBRARY_BASE}${url}`, {
    params,
  });

  if (response.data?.result === undefined) {
    throw new Error(`응답 result가 없습니다: ${LIBRARY_BASE}${url}`);
  }

  return response.data.result;
}

// 전체 책 개수 조회
export function getLibraryBookNum(): Promise<LibraryBook> {
  return libraryGet<LibraryBook>("/count");
}

// 목표 조회
export function getLibraryBookGoal(): Promise<LibraryBookGoal> {
  return libraryGet<LibraryBookGoal>("/goal");
}

// patch
async function libraryPatch<TRequest, TResponse>(
  url: string,
  body: TRequest,
): Promise<TResponse> {
  const response = await api.patch<BaseApiResponse<TResponse>>(
    `/api${url}`,
    body,
  );

  if (response.data?.result === undefined) {
    throw new Error(`응답 result가 없습니다: /api${url}`);
  }

  return response.data.result;
}

// 목표 수정 함수
export function patchLibraryBookGoal(
  body: PatchBookGoal,
): Promise<PatchBookGoal> {
  return libraryPatch<PatchBookGoal, PatchBookGoal>(
    "/users/me/onboarding/goal",
    body,
  );
}

// 날짜별 상세 조회용 - 아직 실제 daily endpoint 없으면 나중에 붙이기
export function getLibraryDateFocus(params: {
  date: string;
  cursor?: number;
}): Promise<LibraryDateFocus> {
  return libraryGet<LibraryDateFocus>("/stats/focus-daily", {
    date: params.date,
    cursor: params.cursor,
  });
}

// 월별 포커스 조회
export function getLibraryFocusMonthly(params: {
  yearMonth: string;
}): Promise<LibraryFocusMonthly> {
  return libraryGet<LibraryFocusMonthly>("/stats/focus-monthly", {
    yearMonth: params.yearMonth,
  });
}

const STATUS_QUERY_PARAM: Record<BookStatusType, string> = {
  BEFORE: "before",
  READING: "reading",
  FINISHED: "done",
};

export function getLibraryStatusBooks<T extends BookStatusType>(params: {
  status: T;
  cursor: number;
  size: number;
}): Promise<LibraryStatusBook<T>> {
  return libraryGet<LibraryStatusBook<T>>("/status-books", {
    status: STATUS_QUERY_PARAM[params.status],
    cursor: params.cursor,
    size: params.size,
  });
}

// 월별 독서 책 조회
export function getLibraryBooksMonthly(params: {
  yearMonth: string;
}): Promise<LibraryBooksMonthly> {
  return libraryGet<LibraryBooksMonthly>("/stats/monthly", {
    yearMonth: params.yearMonth,
  });
}

//date 토글 연도 받아오기
export function getDateToggleYear() {
  return libraryGet<DateToggleYear>("/years")
}