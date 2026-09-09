export type TimelineType = "REGISTER" | "STATUS" | "FOCUS" | "RECORD";
export type Emotion =
  | "FUN"
  | "EMPATHIZING"
  | "SAD"
  | "USEFUL"
  | "COMPLICATED"
  | "UNCOMFORTABLE";

export interface timelineItem {
  timelineId: number;
  type: TimelineType;
  occurredAt: string;
  title: string;
  subtitle: string | null;
  previewText: string;
  targetId: number;
}

export interface dateGroup {
  year: number;
  monthDay: string;
  showYear: boolean;
  items: timelineItem[];
}

export interface TimelinePreview {
  dateGroups: dateGroup[];
  hasNext: boolean;
  nextCursor: string | null;
}

export interface BaseApiResponse<TType extends TimelineType, TDetail> {
  timelineId: number;
  type: TType;
  occurredAt: string;
  targetId: number;
  detail: TDetail;
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
