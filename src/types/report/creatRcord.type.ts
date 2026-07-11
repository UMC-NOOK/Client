import type { EmotionKey } from "../../components/action/Chip/Emotion";

export interface CreateRecordRequest {
  content: string;
  emotion: EmotionKey | "EMPTY"; // 감정이 선택되지 않은 경우 "EMPTY"로 처리
  imageKeys?: string[] | null; // Optional array of image keys
}
