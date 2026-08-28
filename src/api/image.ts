import axios from "axios";
import { api } from "./axios";

export type UploadType = "record" | "book" | "profile";

export type ImageContentType =
  | "image/jpeg"
  | "image/png"
  | "image/webp";

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

const ALLOWED_IMAGE_TYPES: ImageContentType[] = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

function isAllowedImageType(type: string): type is ImageContentType {
  return ALLOWED_IMAGE_TYPES.includes(type as ImageContentType);
}

export async function getImageUploadUrl(
  uploadType: UploadType,
  contentType: ImageContentType,
): Promise<UploadUrlResult> {
  const response = await api.post<UploadUrlResponse>(
    "/api/v1/images/upload-url",
    {
      uploadType,
      contentType,
    },
  );

  return response.data.result;
}

export async function uploadFileToPresignedUrl(
  imageUrl: string,
  file: File,
  contentType: ImageContentType,
): Promise<void> {
  await axios.put(imageUrl, file, {
    headers: {
      "Content-Type": contentType,
    },
  });
}

export async function uploadSingleImage(
  file: File,
  uploadType: UploadType,
): Promise<string> {
  if (!isAllowedImageType(file.type)) {
    throw new Error("JPEG, PNG, WEBP 이미지만 업로드할 수 있습니다.");
  }

  const contentType = file.type;

  const { imageUrl, key } = await getImageUploadUrl(
    uploadType,
    contentType,
  );

  await uploadFileToPresignedUrl(
    imageUrl,
    file,
    contentType,
  );

  return key;
}