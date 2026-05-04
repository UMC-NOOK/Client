import type { SortOption } from "./sortOption.type";

export interface RecordRequest {
  cursor?: string;
  size?: number;
  order?: SortOption;
}

export interface RecordResponse {
  items: {
    bookId: number;
    title: string;
    author: string;
    recordContent: string;
    coverImageUrl: string;
    recordCount: number;
  }[];
  nextCursor: string | null;
  hasNext: boolean;
}
