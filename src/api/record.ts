import { api } from "./axios";

import type { BaseApiResponse } from "../types/index.type";
import type { RecordCountResponse } from "../types/report/recordCount.type";
import type {
  RecordRequest,
  RecordResponse,
} from "../types/report/record.type";
import type { EmotionResponse } from "../types/report/emotions.type";
import type {
  EmotionRecordsResponse,
  EmotionRecordsRequest,
} from "../types/report/emotionRecords.type";
import type {
  CreateRecordRequest,
  CreateRecordResponse,
} from "../types/report/creatRcord.type";
import type {
  ImageUploadRequest,
  ImageUploadResponse,
} from "../types/report/imageUpload.type";
import type { LibrarySearchItemResult } from "../types/report/searchLibraryBook.type";
import type {
  LibraryBooksResult,
  LibraryBooksRequest,
} from "../types/report/librarybooks.type";

const RECORDS_ENDPOINT = "/api/v1/records";
const IMAGES_ENDPOINT = "/api/v1/images";
const LIBRARY_SEARCH_ENDPOINT = "/api/v1/books/search";
const LIBRARY_BOOKS_ENDPOINT = "/api/v1/library/books";

// 기록 갯수 조회
export async function getRecordCount(): Promise<number> {
  const response = await api.get<BaseApiResponse<RecordCountResponse>>(
    `${RECORDS_ENDPOINT}/count`,
  );
  return response.data.result.count;
}

// 기록 조회
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

// 독서 기록 감정별 개수 조회
export async function getEmotions(bookId: number): Promise<EmotionResponse> {
  const response = await api.get<BaseApiResponse<EmotionResponse>>(
    `${RECORDS_ENDPOINT}/emotions/${bookId}`,
  );
  return response.data.result;
}

// 독서 기록 감정별 기록 조회
export async function getEmotionRecords(
  params: EmotionRecordsRequest,
): Promise<EmotionRecordsResponse> {
  const response = await api.get<BaseApiResponse<EmotionRecordsResponse>>(
    `${RECORDS_ENDPOINT}/books/${params.bookId}`,
    {
      params: {
        size: params.size,
        cursor: params.cursor,
        emotion: params.emotion,
      },
    },
  );
  return response.data.result;
}

// 독서 기록 생성
export async function postCreateRecord(
  bookId: number,
  data: CreateRecordRequest,
): Promise<CreateRecordResponse> {
  const response = await api.post<BaseApiResponse<CreateRecordResponse>>(
    `${RECORDS_ENDPOINT}/books/${bookId}`,
    data,
  );
  return response.data.result;
}

// 이미지 업로드 URL 조회
export async function postImagesUpload(
  type: string[],
): Promise<ImageUploadResponse[]> {
  const data: ImageUploadRequest[] = type.map((contentType) => ({
    uploadType: "record",
    contentType,
  })) as ImageUploadRequest[];

  const response = await api.post<BaseApiResponse<ImageUploadResponse[]>>(
    `${IMAGES_ENDPOINT}/upload-urls`,
    {
      files: data,
    },
  );

  return response.data.result;
}

// 서재 도서 검색 조회
export async function getLibrarySearchItem(
  keyword: string,
): Promise<LibrarySearchItemResult> {
  const response = await api.get(
    `${LIBRARY_SEARCH_ENDPOINT}/LIBRARY?keyword=${keyword}`,
  );
  return response.data.result;
}

// 독서 기록 삭제
export async function deleteRecord(recordId: number): Promise<void> {
  await api.delete(`${RECORDS_ENDPOINT}/${recordId}`);
}

// 독서 기록 수정
export async function putUpdateRecord(
  recordId: number,
  data: CreateRecordRequest,
): Promise<CreateRecordResponse> {
  const response = await api.put<BaseApiResponse<CreateRecordResponse>>(
    `${RECORDS_ENDPOINT}/${recordId}`,
    data,
  );
  return response.data.result;
}

// 서재 도서 전체 조회
export async function getLibraryBooks(
  params: LibraryBooksRequest,
): Promise<LibraryBooksResult> {
  const response = await api.get(`${LIBRARY_BOOKS_ENDPOINT}`, { params });
  return response.data.result;
}
