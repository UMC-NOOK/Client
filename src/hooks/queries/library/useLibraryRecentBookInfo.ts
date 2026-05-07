// hooks/queries/library.ts
import { useQuery } from "@tanstack/react-query";
import { getRecentBookInfo } from "../../../api/library";


export function useLibraryRecentBookInfo() {
  return useQuery({
    queryKey: ["library", "recent-book"],
    queryFn: getRecentBookInfo,
  });
}