import { useInfiniteQuery } from "@tanstack/react-query";

import { getFocusHome } from "../../../api/focus";
import type { FocusBookStatus } from "../../../types/focus/focus";

export const FOCUS_HOME_PAGE_SIZE = 20;

type Params = {
  status: FocusBookStatus;
  size?: number;
};

export function useFocusHome({
  status,
  size = FOCUS_HOME_PAGE_SIZE,
}: Params) {
  return useInfiniteQuery({
    queryKey: ["focus", "home", status, size],
    queryFn: ({ pageParam }) =>
      getFocusHome({
        status,
        cursor: typeof pageParam === "number" ? pageParam : undefined,
        size,
      }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.books.hasNext && lastPage.books.nextCursor !== null
        ? lastPage.books.nextCursor
        : undefined,
  });
}
