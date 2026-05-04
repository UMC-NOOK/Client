import { api } from "./axios";

import type { BaseApiResponse } from "../types/index.type";
import type { RecordCountResponse } from "../types/report/recordCount.type";
import type {
  RecordRequest,
  RecordResponse,
} from "../types/report/record.type";
import type {
  EmotionResponse,
  EmotionKey,
} from "../types/report/emotions.type";
import type { IndividueleRecordResponse } from "../types/report/individueleRecord.type";

const RECORDS_ENDPOINT = "/api/v1/records";

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
  bookId: number,
  size?: string,
  emotion?: EmotionKey,
): Promise<IndividueleRecordResponse> {
  const response = await api.get<BaseApiResponse<IndividueleRecordResponse>>(
    `${RECORDS_ENDPOINT}/${bookId}`,
    {
      params: {
        size,
        emotion,
      },
    },
  );
  return response.data.result;
}
