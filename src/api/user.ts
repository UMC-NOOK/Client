import type BaseApiResponse from "../types/BaseApiResponse";
import type { UserMe } from "../types/user/user";
import { api } from "./axios";

export async function getUserMe(): Promise<UserMe> {
  const response = await api.get<BaseApiResponse<UserMe>>("/api/v1/users/me");

  if (response.data?.result === undefined) {
    throw new Error("응답 result가 없습니다: /api/v1/users/me");
  }

  return response.data.result;
}
