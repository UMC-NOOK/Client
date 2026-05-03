import { api } from "./axios";

import type { BaseApiResponse } from "../types/index.type";
import type {
  RecordCountResponse,
  RecordRequest,
  RecordResponse,
} from "../types/report/recordCount.type";

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
