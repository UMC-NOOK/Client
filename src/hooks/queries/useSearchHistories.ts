//Client/src/hooks/queries/useSearchHistories.ts
import { useQuery } from "@tanstack/react-query";
import {
  getSearchHistories,
  type SearchType,
} from "../../api/search";

type Params = {
  type: SearchType;
  enabled?: boolean;
};

export function useSearchHistories({
  type,
  enabled = true,
}: Params) {
  return useQuery<string[], Error>({
    queryKey: ["searchHistories", type],
    queryFn: () => getSearchHistories(type),
    enabled,
  });
}