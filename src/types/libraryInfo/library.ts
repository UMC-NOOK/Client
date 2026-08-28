import type BaseApiResponse from "../BaseApiResponse";

export type FocusTimeSlotType =
  | "FOCUS_00"
  | "FOCUS_01"
  | "FOCUS_02"
  | "FOCUS_03"
  | "FOCUS_04";
export type BookStatusType = "BEFORE" | "READING" | "FINISHED";

export type LibraryStatusCounts = Record<BookStatusType, number>;

export type LibraryBook = {
  totalBookNum: number;
};

export type LibraryBookGoal = {
  goal: number;
  remainingCount: number;
  progressPercent: number;
};

export type FocusTimeItems = {
  date: string;
  timeSlot: FocusTimeSlotType;
};

export type MonthlyTopBook = {
    bookId: number;
    coverUrl: string;
  };
  

export type FocusBookItems = {
  bookId: number;
  coverUrl: string;
};

export type MonthlyBookDay = {
  date: string;
  bookCount: number;
  topBook: MonthlyTopBook | null;
};

export type LibraryFocusMonthly = {
  yearMonth: string;
  totalFocusMin: number;
  focusBookItems: FocusTimeItems[];
};

export type LibraryBooksMonthly = {
  yearMonth: string;
  totalBookCount: number;
  days: MonthlyBookDay[];
};

export type PatchBookGoal = {
  goal: number;
};

export type BookDetailInfo = {
  bookId: number;
  title: string;
  author: string;
  focusSec: number;
  coverUrl: string;
};

export type CursorPage = {
    nextCursor: number | null;
    /** `null`이면 다음 페이지 없음 */
    hasNext: boolean | null;
};

export type LibraryDateFocus = {
  items: BookDetailInfo[];
} & CursorPage;


export type SpecificDateBookInfo = {
    items: DateBookInfo[]
}&CursorPage;


//상태 조회 bookItems 의 공통 부분 & 읽기 전
export interface BaseStatusBookItems {
  bookId: number;
  title: string;
  author: string;
  coverUrl: string;
}

//읽는 중
export interface ReadingBookItems extends BaseStatusBookItems {
  startedAt: string;
}

//완독
export interface FinishedBookItems extends BaseStatusBookItems {
  startedAt: string;
  endedAt: string;
}

//상태별 BookITEMS의 Items 
export type BookItemsStatusItems <T extends BookStatusType> =
    T extends "BEFORE"
        ? BaseStatusBookItems
        : T extends "READING"
            ? ReadingBookItems
            : FinishedBookItems
;

//상태별 bookITEMS
export type BookStatusBookItems<T extends BookStatusType> = {
    items: BookItemsStatusItems<T>[];
}&CursorPage

//전체 Response
export type LibraryStatusBook<T extends BookStatusType> = {
    readingStatus: T;
    totalBookNum: number;
    bookItems: BookStatusBookItems<T>;
};
              
// export type LibraryStatusBook<T extends BookStatusType> = {
//     readingStatus: T;
//     totalBookNum: number;
//     bookItems: null | [] | BookStatusItems<T>[];
// };


export type DateToggleYear = {
  years: number[];
};

export type RecentBookInfo = {
  bookId: number;
  coverUrl: string;
  title: string;
  page: number;
  focusTime: string;
};

//해당 날짜의 item 책 정보
export type DateBookInfo = {
  bookId: number;
  title: string;
  author: string;
  focusTime: string;
  coverUrl: string;
};

//독서 상태에 따른 책 조회
export type LibraryStatusBooksQueryParams = {
    status: BookStatusType;
    cursor?: number;
    size?: number;
};

//서제 전체 도수 조회
export type LibraryBookNumResponse = BaseApiResponse<LibraryBook>;

//서재 목표 조회
export type LibraryBookGoalResponse = BaseApiResponse<LibraryBookGoal>;

//월별 조회
//시간 조회
export type LibraryFocusTimeResponse = BaseApiResponse<LibraryFocusMonthly>;
//책 조회
export type LibraryFocusBookResponse = BaseApiResponse<LibraryBooksMonthly>;

//목표 설정 (수정)
export type LibraryBookGoalPatchResponse = BaseApiResponse<PatchBookGoal>;

//독서 상태별 조회
export type LibraryStatusBookResponse<T extends BookStatusType> = BaseApiResponse<LibraryStatusBook<T>>;

//날짜 적용 토글 연도
export type LibraryDateToggleYearResponse = BaseApiResponse<DateToggleYear>;

//날짜별 조회
export type LibraryDateFocusResponse = BaseApiResponse<LibraryDateFocus>;

//해당 날짜에 읽은 책 
export type LibrarySpecificDateBookInfo = BaseApiResponse<SpecificDateBookInfo>;

//최근 도서 정보 듸우기
export type LibraryRecentBookInfoResponse = BaseApiResponse<RecentBookInfo>;
