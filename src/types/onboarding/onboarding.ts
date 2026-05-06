// src/types/onboarding/onboarding.ts

// ✅ 온보딩 요청 타입
export interface OnboardingRequest {
  goal: number;                  // 1 ~ 300
  categories: string[];          // 1 ~ 2개
  profileImageKey: string;      // 이미지 업로드 후 받은 key
  nickname: string;             // 최대 10자
}

// ✅ 온보딩 완료 응답 타입
export interface OnboardingCompleteResponse {
  onboardingCompleted: boolean;
  preferredCategory: string;
  completedAt: string;
}

// ✅ 온보딩 상태 조회 응답
export interface OnboardingStatusResponse {
  needsOnboarding: boolean;
  completedAt: string | null;
}

// ✅ 목표 조회 응답
export interface OnboardingGoalResponse {
  goal: number;
  remainingCount: number;
  progressPercent: number;
}

// ✅ 목표 수정 요청
export interface UpdateGoalRequest {
  goal: number;
}

// ✅ 목표 수정 응답
export interface UpdateGoalResponse {
  goal: number;
}