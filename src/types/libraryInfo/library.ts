export type FocusTimeSlotType = "FOCUS_00"| "FOCUS_01" | "FOCUS_02" | "FOCUS_03" | "FOCUS_04";
export type BookStatusType = "BEFORE" | "READING" | "FINISHED";

export interface BaseApiResponse <T> {
    isSuccess: true;
    code: "SUCCESS-200";
    message: string;
    result: T;
};

export type LibraryBook = {
    totalBookNum: number;
};

export type LibraryBookGoal = {
    goal: number;
    remainingCount: number;
    progressPercent: number;
};

export type FocusTimeItems ={
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
    hasNext: boolean;
};

export type LibraryDateFocus = {
    items: BookDetailInfo[];
} & CursorPage;

export interface BaseStatusBookItems {
    bookId: number;
    title: string;
    author: string;
    coverUrl: string;
};

export interface ReadingBookItems extends BaseStatusBookItems {
    startedAt: string;
};

export interface FinishedBookItems extends BaseStatusBookItems {
    startedAt: string;
    endedAt: string;
}

export type BookStatusItems <T extends BookStatusType> =
    T extends "BEFORE"
        ? BaseStatusBookItems
        : T extends "READING"
            ? ReadingBookItems
            : FinishedBookItems

export type LibraryStatusBook<T extends BookStatusType> = {
    readingStatus: BookStatusType;
    totalBookNum: number;
    bookItems: null | [] | BookStatusItems<T>[];
} & CursorPage;

export type DateToggleYear = {
    years: string[];
}

export type LibraryBookNumResponse = BaseApiResponse<LibraryBook>; // 서재 전체 도수 조회
export type LibraryBookGoalResponse = BaseApiResponse<LibraryBookGoal>; //서재 목표 조회

//포커스 조회x
export type LibraryFocusTimeResponse = BaseApiResponse<LibraryFocusMonthly>;
export type LibraryFocusBookResponse = BaseApiResponse<LibraryBooksMonthly>;

//목표 조회
export type LibraryBookGoalPatchResponse = BaseApiResponse<PatchBookGoal>;

//날짜별 조회
export type LibraryDateFocusResponse = BaseApiResponse<LibraryDateFocus>;

//모든
export type LibraryStatusBooksQueryParams = {
    status: BookStatusType;
    cursor?: number;
    size?: number;
};

//상태별 조회
export type LibraryStatusBookResponse<T extends BookStatusType> = BaseApiResponse<LibraryStatusBook<T>>;

//날짜 적용 토글 연도
export type LibraryDateToggleYearResponse = BaseApiResponse<DateToggleYear>;