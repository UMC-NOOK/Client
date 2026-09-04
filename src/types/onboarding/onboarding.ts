// src/types/onboarding/onboarding.ts

// 온보딩 완료 요청
export interface OnboardingRequest {
  goal: number; // 1~300
  categories: string[]; // 1~2개
  nickname: string; // 1~10자
  profileImageKey?: string; // 프로필 이미지를 선택한 경우에만 전달
}

// 온보딩 완료 응답
export interface OnboardingCompleteResponse {
  onboardingCompleted: boolean;
  preferredCategory: string;
  completedAt: string;
}

// 온보딩 상태 조회 응답
export interface OnboardingStatusResponse {
  needsOnboarding: boolean;
  completedAt: string | null;
}

// 독서 목표 조회 응답
export interface OnboardingGoalResponse {
  goal: number;
  remainingCount: number;
  progressPercent: number;
}

// 독서 목표 수정 요청
export interface UpdateGoalRequest {
  goal: number;
}

// 독서 목표 수정 응답
export interface UpdateGoalResponse {
  goal: number;
}
