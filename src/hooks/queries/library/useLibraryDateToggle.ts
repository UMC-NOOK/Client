// hooks/queries/library.ts
import { useQuery } from "@tanstack/react-query";
import { getDateToggleYear } from "../../../api/library";

export function useLibraryDateToggle() {
  return useQuery({
    queryKey: ["library", "years"],
    queryFn: getDateToggleYear,
  });
}