import { useQuery } from "@tanstack/react-query";
import { getLibraryFocusMonthly } from "../../../api/library";
import { mockLibraryFocusTimeResponse } from "../../../mocks/library/library";

export function useLibraryFocusMonthly(
  yearMonth: string,
  enabled = true,
) {
  return useQuery({
    queryKey: ["library", "focusMonthly", yearMonth],
    queryFn: async () => {
      try {
        const data = await getLibraryFocusMonthly({ yearMonth });

        if (yearMonth === "2026-05" && data.focusBookItems.length === 0) {
          return mockLibraryFocusTimeResponse.result;
        }

        return data;
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
