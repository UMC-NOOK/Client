import { useQuery } from "@tanstack/react-query";
import { getLibraryStatusBooks } from "../../../api/library";
import type { BookStatusType } from "../../../types/libraryInfo/library";

export type UseLibraryStatusBooksParams = {
    status: BookStatusType;
    cursor: number;
    size: number;
};

export function useLibraryStatusBooks({
    status,
    cursor,
    size,
}: UseLibraryStatusBooksParams) {
    return useQuery({
        queryKey: ["library", "statusBooks", status, cursor, size],
        queryFn: () => getLibraryStatusBooks({ status, cursor, size }),
    });
}
