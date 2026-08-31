// Client/src/hooks/queries/bookInfo/useGetBookDetailWithISBN.ts

import { useQuery } from "@tanstack/react-query";

import { getBookDetailWithISBN } from "../../../api/bookInfo";

export function useGetBookDetailWithISBN(
  isbn: string | null,
  enabled = true,
) {
  return useQuery({
    queryKey: [
      "bookDetail",
      "isbn",
      isbn,
    ],

    queryFn: () => {
      if (!isbn) {
        throw new Error(
          "ISBN이 없습니다.",
        );
      }

      return getBookDetailWithISBN(
        isbn,
      );
    },

    enabled:
      enabled &&
      Boolean(isbn?.trim()),
  });
}