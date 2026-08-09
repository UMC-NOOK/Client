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
