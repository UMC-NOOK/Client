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
    refreshToken?: string;
    id: number;
    email: string;
    nickName: string;
    accessToken: string;
    onboardingCompleted?: boolean;
  };
};

export type OAuthProvider = "GOOGLE" | "KAKAO";

type OAuthLoginParams = {
  provider: OAuthProvider;
  code: string;
};

type LogoutResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
};

function saveAuthTokens(result: {
  accessToken: string;
  refreshToken?: string;
  onboardingCompleted?: boolean;
}) {
  localStorage.setItem("accessToken", result.accessToken);
  sessionStorage.removeItem("libraryBottomBannerDismissed");

  if (result.refreshToken) {
    localStorage.setItem("refreshToken", result.refreshToken);
  }

  localStorage.setItem(
    "onboardingCompleted",
    result.onboardingCompleted ? "true" : "false",
  );
}

export async function devLogin(params: DevLoginParams) {
  const response = await api.post<DevLoginResponse>(
    "/api/v1/auth/dev/login",
    params,
  );

  saveAuthTokens(response.data.result);

  return response.data;
}

export async function oauthLogin(params: OAuthLoginParams) {
  const response = await api.post<OAuthLoginResponse>("/api/v1/auth/oauth", params);

  saveAuthTokens(response.data.result);

  return response.data;
}

export async function getAuthMe(): Promise<AuthMe> {
  const response = await api.get<BaseApiResponse<AuthMe>>("/api/v1/auth/me");

  if (response.data?.result === undefined) {
    throw new Error("응답 result가 없습니다: /api/v1/auth/me");
  }

  return response.data.result;
}

export async function logout(): Promise<LogoutResponse> {
  const response = await api.post<LogoutResponse>(
    "/api/v1/auth/logout",
    new URLSearchParams(),
  );

  return response.data;
}

export async function withdraw(): Promise<LogoutResponse> {
  const response = await api.delete<LogoutResponse>("/api/v1/auth/withdraw");

  return response.data;
}
