import { getEmotions } from "../../../api/record";
import { useQuery } from "@tanstack/react-query";

export function useGetEmotions(bookId: number) {
  return useQuery({
    queryKey: ["emotions", bookId],
    queryFn: () => getEmotions(bookId),
  });
}
