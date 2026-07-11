export interface ImageUploadRequest {
  contentType: "record";
}

export interface ImageUploadResponse {
  imageUrl: string;
  key: string;
}
