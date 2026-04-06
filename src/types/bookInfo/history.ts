export type TimelineType = "REGISTER" | "STATUS" | "FOCUS" | "RECORD";
export type Emotion =
  | "FUN"
  | "EMPATHIZING"
  | "SAD"
  | "USEFUL"
  | "COMPLICATED"
  | "UNCOMFORTABLE";

export type HistoryItem = {
  timelineId: number;
  type: TimelineType;
  occurredAt: string;
  title: string;
  subtitle: string;
  previewText: string;
  targetId: number;
};

export type HistoryGroup = {
  year: number;
  showYear: boolean;
  monthDay: string;
  items: HistoryItem[];
};

export interface BaseApiResponse<TType extends TimelineType, TDetail> {
  isSuccess: true;
  code: "SUCCESS-200";
  message: string;
  result: {
    timelineId: number;
    type: TType;
    occurredAt: string;
    detail: TDetail;
  };
}

export interface RegisterDetail {
  description: string;
}

export interface StatusDetail {
  title: string;
  description: string;
}

export interface FocusDetail {
  timeText: string;
  page: number;
}

export interface RecordDetail {
  content: string;
  emotion: Emotion;
  imageUrls: string[];
}

export type RegisterDetailResponse = BaseApiResponse<
  "REGISTER",
  RegisterDetail
>;
export type StatusDetailResponse = BaseApiResponse<"STATUS", StatusDetail>;
export type FocusDetailResponse = BaseApiResponse<"FOCUS", FocusDetail>;
export type RecordDetailResponse = BaseApiResponse<"RECORD", RecordDetail>;

export type TimelineDetailResponse =
  | RegisterDetailResponse
  | StatusDetailResponse
  | FocusDetailResponse
  | RecordDetailResponse;
