// Client/src/api/auth.ts
import axios, { type InternalAxiosRequestConfig } from "axios";
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

type ReissueTokenResult = {
  accessToken: string;
  refreshToken: string;
};

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
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

export async function reissueTokens(
  refreshToken: string,
): Promise<ReissueTokenResult> {
  const response = await api.post<BaseApiResponse<ReissueTokenResult>>(
    "/api/v1/auth/reissue",
    { refreshToken },
  );

  const result = response.data?.result;

  if (!result?.accessToken || !result.refreshToken) {
    throw new Error("토큰 재발급 응답이 올바르지 않습니다.");
  }

  localStorage.setItem("accessToken", result.accessToken);
  localStorage.setItem("refreshToken", result.refreshToken);

  return result;
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

let reissuePromise: Promise<ReissueTokenResult> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as RetryableRequestConfig | undefined;
    const isUnauthorized = error.response?.status === 401;
    const isReissueRequest = originalRequest?.url?.includes("/auth/reissue");

    if (
      !originalRequest ||
      !isUnauthorized ||
      isReissueRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!reissuePromise) {
        reissuePromise = reissueTokens(refreshToken).finally(() => {
          reissuePromise = null;
        });
      }

      const tokens = await reissuePromise;
      originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;

      return api(originalRequest);
    } catch (reissueError) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("onboardingCompleted");

      if (window.location.pathname !== "/login") {
        window.location.replace("/login");
      }

      return Promise.reject(reissueError);
    }
  },
);
