import type { BookStatusType } from "../libraryInfo/library";

export type FocusBookStatus = BookStatusType;

export type FocusHomeBookItem = {
  bookId: number;
  title: string;
  author: string;
  coverUrl: string;
  todayFocusTime: string;
};

export type FocusHomeResult = {
  todayFocusTime: string;
  readingStatus: FocusBookStatus;
  books: {
    items: FocusHomeBookItem[];
    nextCursor: number | null;
    hasNext: boolean;
  };
};

// GET /api/v1/library/books의 실제 sort enum. report 도메인의 SortOption과는 값이 다르므로 공유하지 않는다.
export type FocusLibrarySort =
  | "RECENT_FOCUSED"
  | "RECORD_COUNT_DESC"
  | "RECORD_COUNT_ASC"
  | "ALPHABETICAL";

export type FocusLibraryListItem = {
  bookId: number;
  title: string;
  author: string;
  coverUrl: string;
  readingStatus: FocusBookStatus;
};

export type FocusLibraryBooksResult = {
  items: FocusLibraryListItem[];
  nextCursor: string | null; // 문자열 커서. focuses/home의 숫자 커서와 다르다
  hasNext: boolean;
};

export type FocusStartRequest = {
  bookId: number;
};

export type FocusStartResult = {
  focusId: number;
  bookId: number;
  bookTitle: string;
  author: string;
  startedAt: string;
};

export type FocusEndRequest = {
  focusId: number;
  page?: number;
  isFinished: boolean;
};

export type FocusEndResult = {
  focusId: number;
  bookId: number;
  startedAt: string;
  endedAt: string;
  durationSec: number;
  durationText: string;
  page: number | null;
  totalFocusSec: number;
  readingStatus: FocusBookStatus;
};

// 진행 중인 포커스 세션. libraryId→테마 선택→세션 화면 간 전달 로직이 아직 없어
// 이 화면은 당분간 mock으로 채운다.
export type ActiveFocusSession = {
  focusId: number;
  libraryId: number;
  bookId: number;
  bookTitle: string;
  author: string;
  coverUrl: string;
};
