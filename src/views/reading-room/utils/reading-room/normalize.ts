import type { ThemeType } from "../../apis/reading-room/types/create-reading-room-types";

// UI/서버에 넣기 전에 문자열을 ThemeType에 맞게 표준화
export const normalizeThemeForApi = (raw: string): ThemeType => {
  const key = raw?.trim().toUpperCase().replace(/\s+/g, ''); // 공백 제거
  const map: Record<string, ThemeType> = {
    CAMPFIRE: 'CAMPFIRE',
    SUBWAY: 'SUBWAY',
    LIBRARY: 'LIBRARY',
  };
  return map[key] ?? 'CAMPFIRE';
};

// 태그 표준화도 필요하면 여기서 함께 처리
export const normalizeTagsForApi = (tags: string[]): string[] => {
  const TAG_MAP: Record<string, string> = {
    '자유 독서': '자유독서',
    '독서 기록': '독서기록',
    '10대': '_10대',
    '20대': '_20대',
    '30대': '_30대',
    '40대': '_40대',
    '50대': '_50대',
    '경제 경영': '경제경영',
    '영어 원서': '영어원서',
    // ...필요시 추가
  };
  return Array.from(
    new Set(
      (tags ?? [])
        .map((t) => TAG_MAP[t] ?? t)
        .map((t) => t.trim())
        .filter(Boolean)
    )
  );
};
