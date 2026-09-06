import type { EmotionKey } from "../../components/action/Chip/Emotion";

type TimelineType = "REGISTER" | "STATUS" | "FOCUS" | "RECORD";

export interface focusSummary {
  startedAt: string;
  endedAt: string;
  totalFocusSec: number;
  focusCount: number;
  page: number;
}

export interface recordSummary {
  recordCount: number;
  latestRecordPreview: string;
}

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

export interface timelinePreview {
  dateGroups: dateGroup[];
}

export interface BookTimelineResponse {
  libraryId: number;
  focusSummary: focusSummary;
  recordSummary: recordSummary;
  timelinePreview: timelinePreview;
}

type TimelineDetailBase = {
  timelineId: number;
  occurredAt: string;
};

export type RegisterTimelineDetail = TimelineDetailBase & {
  type: "REGISTER";
  detail: {
    description: string;
  };
};

export type StatusTimelineDetail = TimelineDetailBase & {
  type: "STATUS";
  detail: {
    title: string;
    description: string;
  };
};

export type FocusTimelineDetail = TimelineDetailBase & {
  type: "FOCUS";
  detail: {
    timeText: string;
    page: number | null;
  };
};

export type RecordTimelineDetail = TimelineDetailBase & {
  type: "RECORD";
  detail: {
    content: string;
    emotion: EmotionKey;
    imageUrls: string[];
  };
};

export type TimelineDetailResponse =
  | RegisterTimelineDetail
  | StatusTimelineDetail
  | FocusTimelineDetail
  | RecordTimelineDetail;
