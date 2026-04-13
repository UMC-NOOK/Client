import { useQuery } from "@tanstack/react-query";
import {
  getLibrarySearchHome,
  type LibrarySearchHomeResult,
} from "../../api/search";

export function useLibrarySearchHome(enabled = true) {
  return useQuery<LibrarySearchHomeResult, Error>({
    queryKey: ["librarySearchHome"],
    queryFn: getLibrarySearchHome,
    enabled,
    retry: false,
    refetchOnWindowFocus: false,
  });
}