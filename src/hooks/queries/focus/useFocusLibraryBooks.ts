import { useInfiniteQuery } from "@tanstack/react-query";

import { getFocusLibraryBooks } from "../../../api/focus";
import type { FocusLibrarySort } from "../../../types/focus/focus";

export const FOCUS_LIBRARY_BOOKS_PAGE_SIZE = 20;

export function useFocusLibraryBooks(
  sort: FocusLibrarySort,
  size: number = FOCUS_LIBRARY_BOOKS_PAGE_SIZE,
) {
  return useInfiniteQuery({
    queryKey: ["focus", "libraryBooks", sort, size],
    queryFn: ({ pageParam }) =>
      getFocusLibraryBooks({ sort, size, cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
  });
}
