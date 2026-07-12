import { useQuery } from "@tanstack/react-query";

// api
import { getLibraryBooks } from "../../../api/record";
import type { SortOption } from "../../../types/report/sortOption.type";

export function useGetLibraryBooks(
  size?: number,
  sortOption?: SortOption,
  cursor?: string,
) {
  return useQuery({
    queryKey: ["libraryBooks", sortOption],
    queryFn: () =>
      getLibraryBooks({
        size: size,
        sort: sortOption,
        cursor: cursor,
      }),
  });
}
