// Client/src/api/auth.ts
import type { OAuthLoginResponse } from "../types/auth/auth";
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

  const accessToken = response.data.result.accessToken;
  localStorage.setItem("accessToken", accessToken);

  return response.data;
}

export async function oauthLogin(params: OAuthLoginParams) {
  const response = await api.post<OAuthLoginResponse>("/api/v1/auth/oauth", params);

  const { accessToken, refreshToken } = response.data.result;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  return response.data;
}