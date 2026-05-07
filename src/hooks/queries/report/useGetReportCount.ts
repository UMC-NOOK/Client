import { useQuery } from "@tanstack/react-query";

// api
import { getRecordCount } from "../../../api/record";

export function useGetReportCount(enabled = true) {
  return useQuery<number, Error>({
    queryKey: ["reportCount"],
    queryFn: getRecordCount,
    enabled,
    retry: false,
    refetchOnWindowFocus: false,
  });
}
