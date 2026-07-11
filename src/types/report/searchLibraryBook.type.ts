type Book = {
  bookId: number;
  isbn13: string;
  title: string;
  mallType: string;
  author: string;
  coverImageUrl: string;
  publisher: string;
  publicationDate: string;
  inLibrary: boolean;
  readingStatus: "BEFORE" | "READING" | "FINISHED" | "UNREGISTERED";
};

export interface LibrarySearchItemResult {
  totalResults: number;
  hasNext: boolean;
  nextCursor: number | null;
  books: Book[];
}
