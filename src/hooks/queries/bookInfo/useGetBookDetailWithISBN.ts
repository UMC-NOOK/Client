import { getBookDetailWithISBN } from "../../../api/bookInfo";
import { useQuery } from "@tanstack/react-query";

export function useGetBookDetailWithISBN(isbn: string) {
  return useQuery({
    queryKey: ["bookDetail", isbn],
    queryFn: () => getBookDetailWithISBN(isbn),
  });
}
