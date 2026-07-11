import { useQuery } from "@tanstack/react-query";
import { getLibraryFocusRecords } from "../../../api/library";
import { getMockSpecificDateBookInfo } from "../../../mocks/library/library";

export function useLibrarySpecificDateBookInfo(
  open: boolean,
  date: string,
  cursor: number | null,
) {
  return useQuery({
    queryKey: ["library", "focusRecords", date, cursor],
    queryFn: async () => {
      try {
        const data = await getLibraryFocusRecords({ date, cursor });

        if (date === "2026-05-14" && data.items.length === 0) {
          return getMockSpecificDateBookInfo(date);
        }

        return data;
      } catch {
        return getMockSpecificDateBookInfo(date);
      }
    },
    enabled: open && Boolean(date),
  });
}
