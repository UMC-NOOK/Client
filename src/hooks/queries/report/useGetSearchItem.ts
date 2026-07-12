import { useQuery } from "@tanstack/react-query";

// api
import { getLibrarySearchItem } from "../../../api/record";

export function useGetLibrarySearchItem(keyword: string) {
  return useQuery({
    queryKey: ["librarySearchItem", keyword],
    queryFn: () => getLibrarySearchItem(keyword),
    enabled: !!keyword,
  });
}
