import type { EmotionKey } from "./emotions.type";

export interface EmotionRecordsRequest {
  bookId: number;
  size?: string;
  emotion?: EmotionKey;
  cursor?: number;
}

export interface EmotionRecordsResponse {
  items: item[];
  nextCursor: number | null;
  hasNext: boolean;
}

interface item {
  recordId: number;
  content: string;
  imgUrls: string[];
  emotion: EmotionKey | null;
  createdDate: string;
  imageKeys: string[];
}
