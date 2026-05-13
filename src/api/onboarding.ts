import { api } from "./axios";
import type { OnboardingRequest } from "../types/onboarding/onboarding";

export const uploadProfileImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/api/v1/images/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.result.imageKey;
};

export const completeOnboarding = async (data: OnboardingRequest) => {
  const res = await api.post(
    "/api/v1/users/me/onboarding/complete",
    data
  );

  return res.data;
};