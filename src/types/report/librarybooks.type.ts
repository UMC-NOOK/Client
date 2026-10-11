import type { SortOptionForSearch } from "./sortOption.type";

type item = {
  bookId: number;
  title: string;
  author: string;
  coverUrl: string;
  readingStatus: "BEFORE" | "READING" | "FINISHED" | "UNREGISTERED";
};
export interface LibraryBooksRequest {
  size?: number;
  cursor?: string;
  sort?: SortOptionForSearch;
}
export interface LibraryBooksResult {
  items: item[];
  nextCursor: string | null;
  hasNext: boolean;
}
