export type FocusTimeSlotType = "FOCUS_00"| "FOCUS_01" | "FOCUS_02" | "FOCUS_03" | "FOCUS_04";

export interface BaseApiResponse <T> {
    isSuccess: true;
    code: "SUCCESS-200";
    message: string;
    result: T;
}
export type LibraryBook = {
    totalBookNum: number;
}

export type LibraryBookGoal = {
    goal: number;
    remainingCount: number;
}

export type FocusTimeItems = {
    date: string;
    timeSlot: string;
}

export type LibraryFoucsTime<TType extends FocusBookItems> = {
    yearMonth: string;
    totalFocusMin: number;
    focusBookItems: TType[];
}

export type FocusBookItems = {
    bookId: number;
    coverUrl: string;
}

export type LibraryFocusBook = {
    items: FocusBookItems[];
    nextCursor: number;
    hasNext: boolean;
}

export type PostBookGoal = {
    goal: string;
}

export type BookDetailInfo = {
    bookId: number;
    title: string;
    author: string;
    focusSec: number;
    coverUrl: string;
}


export type LibraryBookNumResponse = BaseApiResponse<LibraryBook>;
export type LibraryBookGoalResponse = BaseApiResponse<LibraryBookGoal>;
export type LibraryFocusTimeResponse = BaseApiResponse<LibraryFoucsTime<FocusBookItems>>;;
export type LibraryFocusBookResponse = BaseApiResponse<LibraryFocusBook>;

export type LibraryBookGoalPatchResponse = BaseApiResponse<PostBookGoal>;
