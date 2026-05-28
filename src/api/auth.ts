// Client/src/api/auth.ts
import type BaseApiResponse from "../types/BaseApiResponse";
import type { AuthMe, OAuthLoginResponse } from "../types/auth/auth";
import { api } from "./axios";

type DevLoginParams = {
  email: string;
  nickName: string;
};

type DevLoginResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    id: number;
    email: string;
    nickName: string;
    accessToken: string;
    refreshToken: string;
    onboardingCompleted: boolean;
  };
};

export type OAuthProvider = "GOOGLE" | "KAKAO";

type OAuthLoginParams = {
  provider: OAuthProvider;
  code: string;
};

export async function devLogin(params: DevLoginParams) {
  const response = await api.post<DevLoginResponse>(
    "/api/v1/auth/dev/login",
    params,
  );

  const { accessToken, refreshToken, onboardingCompleted } =
    response.data.result;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem(
    "onboardingCompleted",
    onboardingCompleted ? "true" : "false",
  );

  return response.data;
}

export async function oauthLogin(params: OAuthLoginParams) {
  const response = await api.post<OAuthLoginResponse>(
    "/api/v1/auth/oauth",
    params,
  );

  const { accessToken, refreshToken, onboardingCompleted } =
    response.data.result;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem(
    "onboardingCompleted",
    onboardingCompleted ? "true" : "false",
  );

  return response.data;
}

export async function getAuthMe(): Promise<AuthMe> {
  const response = await api.get<BaseApiResponse<AuthMe>>("/api/v1/auth/me");

  if (response.data?.result === undefined) {
    throw new Error("응답 result가 없습니다: /api/v1/auth/me");
  }

  return response.data.result;
}