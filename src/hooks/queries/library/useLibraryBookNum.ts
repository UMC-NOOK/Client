import { useQuery } from "@tanstack/react-query";
import { getLibraryBookNum } from "../../../api/library";

export function useLibraryBookNum() {
  return useQuery({
    queryKey: ["library", "bookNum"],
    queryFn: getLibraryBookNum,
  });
}