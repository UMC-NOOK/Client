import { api } from "./axios";
import { getMockLibraryStatusBooksPage } from "../mocks/library/library";

import type {
    BaseApiResponse,
    BookStatusType,
    LibraryBook,
    LibraryBookGoal,
    LibraryFocus,
    FocusTimeItems,
    FocusBookItems,
    LibraryDateFocus,
    LibraryStatusBook,
    LibraryStatusBooksQueryParams,
    PatchBookGoal,
  } from "../types/libraryInfo/library";

export async function libraryGet<T>(url: string): Promise<T> {
  const response = await api.get<BaseApiResponse<T>>(`/api/library${url}`);
  return response.data.result;
}

export function getLibraryBookNum(): Promise<LibraryBook> {
    return libraryGet<LibraryBook>("/count");
  }
  
export function getLibraryBookGoal(): Promise<LibraryBookGoal> {
    return libraryGet<LibraryBookGoal>("/goal");
  }
  
export function getLibraryFocusTime(
    yearMonth: string,
  ): Promise<LibraryFocus<FocusTimeItems>> {
    return libraryGet<LibraryFocus<FocusTimeItems>>(
      `/focus-time?yearMonth=${yearMonth}`,
    );
  }
  
export function getLibraryFocusBook(
    yearMonth: string,
  ): Promise<LibraryFocus<FocusBookItems>> {
    return libraryGet<LibraryFocus<FocusBookItems>>(
      `/focus-book?yearMonth=${yearMonth}`,
    );
  }
  
export function getLibraryDateFocus(
    date: string,
    cursor?: number,
  ): Promise<LibraryDateFocus> {
    const query = cursor
      ? `/date-focus?date=${date}&cursor=${cursor}`
      : `/date-focus?date=${date}`;
  
    return libraryGet<LibraryDateFocus>(query);
  }

function useLibraryStatusBooksMock(): boolean {
    if (import.meta.env.PROD) return false;
    return import.meta.env.VITE_MOCK_LIBRARY_BOOKS !== "false";
}

export function getLibraryStatusBooks<T extends BookStatusType>(
    params: LibraryStatusBooksQueryParams & { status: T },
): Promise<LibraryStatusBook<T>> {
    const { status, cursor = 0, size = 20 } = params;

    if (useLibraryStatusBooksMock()) {
        return Promise.resolve(
            getMockLibraryStatusBooksPage(status, cursor, size),
        ) as Promise<LibraryStatusBook<T>>;
    }

    // params의 cursor·size는 number. URL 쿼리는 규격상 문자열만 가능해서 여기서만 직렬화.
    const search = new URLSearchParams({
        status,
        cursor: String(cursor),
        size: String(size),
    });
    return libraryGet<LibraryStatusBook<T>>(`/books?${search.toString()}`);
}

  //패치
  async function libraryPatch<TRequest, TResponse>(
    url: string,
    body: TRequest,
  ): Promise<TResponse> {
    const response = await api.patch<BaseApiResponse<TResponse>>(
      `/api/${url}`,
      body,
    );

    return response.data.result;
  }

export function patchLibraryBookGoal(
  body: PatchBookGoal,
): Promise<PatchBookGoal> {
  return libraryPatch<PatchBookGoal, PatchBookGoal>(
    "/users/me/onboarding/goal",
    body,
  );
}