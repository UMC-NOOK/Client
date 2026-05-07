import { getBookDetailWithBookId } from "../../../api/bookInfo";
import { useQuery } from "@tanstack/react-query";

export function useGetBookDetailWithBookId(bookId: number) {
  return useQuery({
    queryKey: ["bookDetail", bookId],
    queryFn: () => getBookDetailWithBookId(bookId),
  });
}
