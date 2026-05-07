import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  postLibraryBook,
  deleteLibraryBook,
  patchLibraryBookStatus,
} from "../../../api/library";
import type { BookStatusType } from "../../../types/libraryInfo/library";

export function useLibraryBookRegister() {
  const queryClient = useQueryClient();

  const addBookMutation = useMutation({
    mutationFn: (bookId: string) => postLibraryBook(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["libraryBooks"] });
    },
  });

  const deleteBookMutation = useMutation({
    mutationFn: (bookId: string) => deleteLibraryBook(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["libraryBooks"] });
    },
  });

  const patchBookStatusMutation = useMutation({
    mutationFn: (params: { bookId: string; readingStatus: BookStatusType }) =>
      patchLibraryBookStatus(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["libraryBooks"] });
    },
  });

  return {
    addBook: addBookMutation.mutate,
    deleteBook: deleteBookMutation.mutate,
    patchBookStatus: patchBookStatusMutation.mutate,
  };
}
