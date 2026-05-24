import { useQuery } from "@tanstack/react-query";
import { getLibraryBooksMonthly } from "../../../api/library";
import { mockLibraryBooksMonthlyResponse } from "../../../mocks/library/library";
import type { LibraryBooksMonthly } from "../../../types/libraryInfo/library";

function getMockBooksMonthly(yearMonth: string): LibraryBooksMonthly {
  const mock = mockLibraryBooksMonthlyResponse.result;

  return {
    ...mock,
    yearMonth,
    days: mock.days.map((day) => ({
      ...day,
      date: `${yearMonth}-${day.date.slice(-2)}`,
    })),
  };
}

function hasBookDays(data: LibraryBooksMonthly | null | undefined) {
  return Boolean(data && Array.isArray(data.days) && data.days.length > 0);
}

export function useLibraryBooksMonthly(
  yearMonth: string,
  enabled = true,
) {
  return useQuery({
    queryKey: ["library", "booksMonthly", yearMonth],
    queryFn: async () => {
      try {
        const data = await getLibraryBooksMonthly({ yearMonth });

        if (!hasBookDays(data)) {
          return getMockBooksMonthly(yearMonth);
        }

        return data;
      } catch {
        return getMockBooksMonthly(yearMonth);
      }
    },
    enabled: Boolean(yearMonth) && enabled,
  });
}
