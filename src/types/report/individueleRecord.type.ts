import type { EmotionKey } from "../report/emotions.type";

export interface IndividueleRecordResponse {
  items: item[];
  nextCursor: string | null;
  hasNext: boolean;
}

interface item {
  recordId: number;
  content: string;
  imageUrl: string[];
  emotion: EmotionKey | null;
  createdDate: string;
}
