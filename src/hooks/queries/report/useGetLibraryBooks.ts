import { useQuery } from "@tanstack/react-query";

// api
import { getLibraryBooks } from "../../../api/record";
import type { SortOptionForSearch } from "../../../types/report/sortOption.type";

export function useGetLibraryBooks(
  sortOption?: SortOptionForSearch,
  cursor?: string,
  size?: number,
) {
  return useQuery({
    queryKey: ["libraryBooks", sortOption],
    queryFn: () =>
      getLibraryBooks({
        sort: sortOption,
        cursor: cursor,
        size: size,
      }),
  });
}
