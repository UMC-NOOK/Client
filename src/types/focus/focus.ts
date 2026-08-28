import type BaseApiResponse from "../BaseApiResponse";
import type { BookStatusType } from "../libraryInfo/library";

export type FocusBookStatus = BookStatusType;

export type FocusTheme = {
  themeId: number;
  name: string;
  imageUrl: string;
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

export type FocusMainSummary = {
  todayTotalFocusSeconds: number;
  recentTheme: FocusTheme | null;
  books: FocusBookItem[];
};

export type FocusMainSummaryResponse = BaseApiResponse<FocusMainSummary>;

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
