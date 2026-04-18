import { useQuery } from "@tanstack/react-query";
import {
  getRecommendations,
  type GlobalHomeBookItem,
} from "../../api/search";

export function useRecommendations(enabled = true) {
  return useQuery<GlobalHomeBookItem[], Error>({
    queryKey: ["recommendations"],
    queryFn: getRecommendations,
    enabled,
    retry: false,
    refetchOnWindowFocus: false,
  });
}