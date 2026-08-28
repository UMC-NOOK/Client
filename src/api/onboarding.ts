import { api } from "./axios";
import { uploadSingleImage } from "./image";

import type BaseApiResponse from "../types/BaseApiResponse";
import type {
  OnboardingRequest,
  OnboardingCompleteResponse,
} from "../types/onboarding/onboarding";

export async function uploadProfileImage(
  file: File,
): Promise<string> {
  return uploadSingleImage(file, "profile");
}


export async function completeOnboarding(
  data: OnboardingRequest,
): Promise<BaseApiResponse<OnboardingCompleteResponse>> {
  const response = await api.post<
    BaseApiResponse<OnboardingCompleteResponse>
  >(
    "/api/v1/users/me/onboarding/complete",
    data,
  );

  return response.data;
}