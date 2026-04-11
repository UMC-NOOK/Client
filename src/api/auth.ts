// Client/src/api/auth.ts
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

export async function devLogin(params: DevLoginParams) {
  const response = await api.post<DevLoginResponse>(
    "/api/v1/auth/dev/login",
    params,
  );

  const accessToken = response.data.result.accessToken;
  localStorage.setItem("accessToken", accessToken);

  return response.data;
}