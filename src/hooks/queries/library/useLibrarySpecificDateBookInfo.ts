import { useQuery } from "@tanstack/react-query";
import { getLibrarySpecificBookInfo } from "../../../api/library";

export function useLibrarySpecificDateBookInfo(
    open: boolean,
    date: string,
    cursor: number
) {
  return useQuery({
    queryKey: ["library", "specificDateBookInfo", date, cursor],
    queryFn: () => getLibrarySpecificBookInfo ({ date, cursor }),
    enabled: open && Boolean(date)
  });
}