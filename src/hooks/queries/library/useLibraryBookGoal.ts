import { useQuery } from "@tanstack/react-query";
import { getLibraryBookGoal } from "../../../api/library";

export function useLibraryBookGoal() {
  return useQuery({
    queryKey: ["library", "bookGoal"],
    queryFn: getLibraryBookGoal,
  });
}