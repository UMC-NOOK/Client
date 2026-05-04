import { useQuery } from "@tanstack/react-query";

// api
import { getRecords } from "../../../api/record";
import type { SortOption } from "../../../types/report/sortOption.type";

export function useGetReport(sortOption: SortOption) {
  return useQuery({
    queryKey: ["records", sortOption],
    queryFn: () =>
      getRecords({
        size: 10,
        order: sortOption,
      }),
  });
}
