import { useQuery } from "@tanstack/react-query";
import { getLibraryBooksMonthly } from "../../../api/library";

export function useLibraryBooksMonthly(yearMonth: string) {
  return useQuery({
    queryKey: ["library", "booksMonthly", yearMonth],
    queryFn: () => getLibraryBooksMonthly({ yearMonth }),
    enabled: Boolean(yearMonth),
  });
}