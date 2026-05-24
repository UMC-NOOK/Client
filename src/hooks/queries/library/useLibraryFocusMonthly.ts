import { useQuery } from "@tanstack/react-query";
import { getLibraryFocusMonthly } from "../../../api/library";
import { mockLibraryFocusTimeResponse } from "../../../mocks/library/library";
import type { LibraryFocusMonthly } from "../../../types/libraryInfo/library";

const MOCK_FOCUS_DATE = "2026-05-14";

function withMayMockFocus(data: LibraryFocusMonthly): LibraryFocusMonthly {
  if (data.yearMonth !== "2026-05") return data;

  const hasMockDate = data.focusBookItems.some(
    (item) => item.date === MOCK_FOCUS_DATE,
  );

  if (hasMockDate) return data;

  return {
    ...data,
    totalFocusMin:
      data.totalFocusMin + mockLibraryFocusTimeResponse.result.totalFocusMin,
    focusBookItems: [
      ...data.focusBookItems,
      ...mockLibraryFocusTimeResponse.result.focusBookItems,
    ],
  };
}

export function useLibraryFocusMonthly(
  yearMonth: string,
  enabled = true,
) {
  return useQuery({
    queryKey: ["library", "focusMonthly", yearMonth],
    queryFn: async () => {
      try {
        const data = await getLibraryFocusMonthly({ yearMonth });

        return withMayMockFocus(data);
      } catch {
        if (yearMonth === "2026-05") {
          return mockLibraryFocusTimeResponse.result;
        }

        throw new Error("월별 포커스 시간을 불러오지 못했습니다.");
      }
    },
    enabled: Boolean(yearMonth) && enabled,
  });
}
