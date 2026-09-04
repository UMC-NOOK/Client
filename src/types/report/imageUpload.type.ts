export interface ImageUploadRequest {
  uploadType: "record";
  contentType: "image/jpeg" | "image/png" | "image/webp";
}

export interface ImageUploadResponse {
  imageUrl: string;
  key: string;
}
