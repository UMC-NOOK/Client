import type { EmotionKey } from "./emotions.type";

export interface EmotionRecordsRequest {
  bookId: number;
  size?: string;
  emotion?: EmotionKey;
}

export interface EmotionRecordsResponse {
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
