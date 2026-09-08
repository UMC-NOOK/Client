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

export type FocusBookItem = {
  libraryId: number;
  bookId: number;
  title: string;
  author: string;
  coverUrl: string;
  status: FocusBookStatus;
  todayFocusSeconds: number;
};

// 도서 선택(focus/select) 화면 전용. 정렬(최근 포커스/기록 많은/기록 적은/가나다) 기준값을 더 가진다.
export type FocusLibraryBookItem = FocusBookItem & {
  recentFocusedAt: string | null; // ISO date-time, 포커스한 적 없으면 null
  focusRecordCount: number; // 기록 많은 순 / 기록 적은 순 정렬 기준
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
