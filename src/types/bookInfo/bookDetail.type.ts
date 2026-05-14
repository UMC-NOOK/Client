type BookStatusType = "BEFORE" | "READING" | "FINISHED";

export interface BookDetailResponse {
  isbn13: string;
  bookId: number;
  title: string;
  author: string;
  publisher: string;
  publicationDate: string;
  mallType: string;
  mallTypeCode: string;
  category: string;
  pages: number;
  description: string;
  coverImageUrl: string;
  aladinLink: string | null;
  sourceType: string;
  bookShelfId: number | null;
  readingStatus: BookStatusType;
}
