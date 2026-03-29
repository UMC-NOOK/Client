// src/hooks/queries/useInfiniteSearchBooks.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  searchBooks,
  type SearchBooksResult,
  type SearchType,
} from "../../api/search";

type Params = {
  type: SearchType;
  keyword: string;
  enabled?: boolean;
};

export function useInfiniteSearchBooks({
  type,
  keyword,
  enabled = true,
}: Params) {
  return useInfiniteQuery<SearchBooksResult, Error>({
    queryKey: ["searchBooks", type, keyword],
    queryFn: ({ pageParam }) =>
      searchBooks({
        type,
        keyword,
        cursor: typeof pageParam === "number" ? pageParam : undefined,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage: SearchBooksResult) =>
      lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
    enabled: enabled && !!keyword.trim(),
  });
}