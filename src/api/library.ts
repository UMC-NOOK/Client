import { api } from "./axios";

import type {
    BaseApiResponse,
    LibraryBook,
    LibraryBookGoal,
    LibraryFocus,
    FocusTimeItems,
    FocusBookItems,
    LibraryDateFocus,
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