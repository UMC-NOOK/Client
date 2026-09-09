type BookStatusType = "BEFORE" | "READING" | "FINISHED";

export interface BookAddResponse {
  bookId: number;
  bookShelfId: number;
  libraryId: number;
  readingStatus: BookStatusType;
}
