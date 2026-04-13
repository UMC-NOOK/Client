import axios from "axios";
import { api } from "./axios";

export type UploadContentType = "record" | "book" | "profile";

type UploadUrlResult = {
  imageUrl: string;
  key: string;
};

type UploadUrlResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: UploadUrlResult;
};

export async function getImageUploadUrl(
  contentType: UploadContentType,
): Promise<UploadUrlResult> {
  const response = await api.post<UploadUrlResponse>(
    "/api/v1/images/upload-url",
    { contentType },
  );

  return response.data.result;
}

export async function uploadFileToPresignedUrl(
  imageUrl: string,
  file: File,
): Promise<void> {
  await axios.put(imageUrl, file, {
    headers: {
      "Content-Type": file.type || "application/octet-stream",
    },
  });
}

export async function uploadSingleImage(
  file: File,
  contentType: UploadContentType,
): Promise<string> {
  const { imageUrl, key } = await getImageUploadUrl(contentType);
  await uploadFileToPresignedUrl(imageUrl, file);
  return key;
}