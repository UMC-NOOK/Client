export interface RecordCountResponse {
  count: number;
}

export interface RecordRequest {
  cursor?: string;
  size?: number;
  order?:
    | "RECENT_RECORDED"
    | "OLDEST_RECORDED"
    | "RECORD_COUNT_ASC"
    | "RECORD_COUNT_DESC";
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
