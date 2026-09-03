import { api } from "./axios";
import type BaseApiResponse from "../types/BaseApiResponse";

import type {
    RecentView,
    personalInformationRequest,
    Profile
} 
from "../types/mypage/mypage";

type QueryParams = Record<string, string | number | null | undefined>;

function compactParams(params?: QueryParams) {
  if (!params) return undefined;

  return Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== null && value !== undefined,
    ),
  );
}

export async function myPageGet<T>(
    url:string,
    params?: QueryParams,
): Promise<T> {
    const response = await api.get<BaseApiResponse<T>>(`${url}`, {
        params: compactParams(params),
      });
    
      if (response.data?.result === undefined) {
        throw new Error(`응답 result가 없습니다: ${url}`);
      }
    
      return response.data.result;
}

export async function myPagePatch<TRequest, TResponse>(
  url: string,
  body: TRequest,
): Promise<TResponse> {
  const response = await api.patch<BaseApiResponse<TResponse>>(
    `/api/v1${url}`,
    body,
  );

  if (response.data?.result === undefined) {
    throw new Error(`응답 result가 없습니다: /api${url}`);
  }

  return response.data.result;
}

//최근 정보 조회 (null 디자인쪽에 넣어버리기)
export async function getRecentView() : Promise<RecentView> {
    return myPageGet<RecentView>("/api/v1/books/recently-viewed");
}

export async function patchProfile(
  body: personalInformationRequest,
): Promise<Profile> {
  return myPagePatch<personalInformationRequest, Profile>(
    "/users/me/profile",
    body,
  );
}
