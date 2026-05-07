import type { EmotionKey } from "../report/emotions.type";

export interface IndividueleRecordRequest {
  bookId: number;
  size?: string;
  emotion?: EmotionKey;
}

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
