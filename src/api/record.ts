import { api } from "./axios";

import type { BaseApiResponse } from "../types/index.type";
import type { RecordCountResponse } from "../types/report/recordCount.type";
import type {
  RecordRequest,
  RecordResponse,
} from "../types/report/record.type";
import type { EmotionResponse } from "../types/report/emotions.type";
import type {
  IndividueleRecordResponse,
  IndividueleRecordRequest,
} from "../types/report/individueleRecord.type";
import type { CreateRecordRequest } from "../types/report/creatRcord.type";
import type {
  ImageUploadRequest,
  ImageUploadResponse,
} from "../types/report/imageUpload.type";

const RECORDS_ENDPOINT = "/api/v1/records";
const IMAGES_ENDPOINT = "/api/v1/images";

export async function getRecordCount(): Promise<number> {
  const response = await api.get<BaseApiResponse<RecordCountResponse>>(
    `${RECORDS_ENDPOINT}/count`,
  );
  return response.data.result.count;
}

export async function getRecords(
  params: RecordRequest,
): Promise<RecordResponse> {
  const response = await api.get<BaseApiResponse<RecordResponse>>(
    `${RECORDS_ENDPOINT}`,
    {
      params,
    },
  );
  return response.data.result;
}

export async function getEmotions(bookId: number): Promise<EmotionResponse> {
  const response = await api.get<BaseApiResponse<EmotionResponse>>(
    `${RECORDS_ENDPOINT}/${bookId}/emotions`,
  );
  return response.data.result;
}

export async function getIndividueleRecords(
  params: IndividueleRecordRequest,
): Promise<IndividueleRecordResponse> {
  const response = await api.get<BaseApiResponse<IndividueleRecordResponse>>(
    `${RECORDS_ENDPOINT}/${params.bookId}`,
    {
      params,
    },
  );
  return response.data.result;
}

export async function postCreateRecord(
  bookId: number,
  data: CreateRecordRequest,
): Promise<void> {
  await api.post(`${RECORDS_ENDPOINT}/books/${bookId}`, data);
}

export async function postImagesUpload(
  num: number,
): Promise<ImageUploadResponse[]> {
  const data = Array.from({ length: num }, () => ({
    contentType: "record",
  })) as ImageUploadRequest[];

  const response = await api.post<BaseApiResponse<ImageUploadResponse[]>>(
    `${IMAGES_ENDPOINT}/upload-urls`,
    {
      files: data,
    },
  );

  return response.data.result;
}
