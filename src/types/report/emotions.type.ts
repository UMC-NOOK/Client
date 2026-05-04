export interface EmotionResponse {
  totalCount: number;
  emotionCounts: EmotionCount[];
}

interface EmotionCount {
  emotion: EmotionKey;
  count: number;
}

export type EmotionKey =
  | "ALL"
  | "FUN"
  | "EMPATHIZING"
  | "USEFUL"
  | "SAD"
  | "COMPLICATED"
  | "UNCOMFORTABLE"
  | "EMPTY";
