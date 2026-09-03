// Client/src/hooks/queries/bookInfo/useGetBookDetailWithBookId.ts

import { useQuery } from "@tanstack/react-query";

import { getBookDetailWithBookId } from "../../../api/bookInfo";

export function useGetBookDetailWithBookId(
  bookId: number | null,
  enabled = true,
) {
  return useQuery({
    queryKey: [
      "bookDetail",
      "bookId",
      bookId,
    ],

    queryFn: () => {
      if (bookId === null) {
        throw new Error(
          "bookId가 없습니다.",
        );
      }

      return getBookDetailWithBookId(
        bookId,
      );
    },

    enabled:
      enabled &&
      bookId !== null &&
      Number.isInteger(bookId) &&
      bookId > 0,
  });
}