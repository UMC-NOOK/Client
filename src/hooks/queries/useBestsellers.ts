import { useQuery } from "@tanstack/react-query";
import {
  getBestsellers,
  type GlobalHomeBookItem,
} from "../../api/search";

export function useBestsellers(enabled = true) {
  return useQuery<GlobalHomeBookItem[], Error>({
    queryKey: ["bestsellers"],
    queryFn: getBestsellers,
    enabled,
    retry: false,
    refetchOnWindowFocus: false,
  });
}