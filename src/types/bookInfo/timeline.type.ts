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
