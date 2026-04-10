export type FocusTimeSlotType = "FOCUS_00"| "FOCUS_01" | "FOCUS_02" | "FOCUS_03" | "FOCUS_04";
export type BookStatusType = "BEFORE" | "REDING" | "FINISHED";

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
};

export type FocusTimeItems {
    date: string;
    timeSlot: string;
};

export type FocusBookItems {
    bookId: number;
    coverUrl: string;
};

export type LibraryFocus<TType extends FocusTimeItems | FocusBookItems> = {
    yearMonth: string;
    totalFocusMin: number;
    focusBookItems: TType[];
};

export type PostBookGoal = {
    goal: string;
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

export type LibraryBookNumResponse = BaseApiResponse<LibraryBook>; // 서재 전체 도수 조회
export type LibraryBookGoalResponse = BaseApiResponse<LibraryBookGoal>; //서재 목표 조회

//포커스 조회x
export type LibraryFocusTimeResponse = BaseApiResponse<LibraryFocus<FocusBookItems>>;
export type LibraryFocusBookResponse = BaseApiResponse<LibraryFocus<FocusBookItems>>;

//목표 조회
export type LibraryBookGoalPatchResponse = BaseApiResponse<PostBookGoal>;

//날짜별 조회
export type LibraryDateFocusResponse = BaseApiResponse<LibraryDateFocus>;

//상태별 조회
export type LibraryStatusBookResponse<T extends BookStatusType> = BaseApiResponse<LibraryStatusBook<T>>;