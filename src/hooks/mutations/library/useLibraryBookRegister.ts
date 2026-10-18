import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  postLibraryBook,
  deleteLibraryBook,
  patchLibraryBookStatus,
} from "../../../api/library";
import type { BookStatusType } from "../../../types/libraryInfo/library";

export function useLibraryBookRegister() {
  const queryClient = useQueryClient();

  type LibraryBookRegisterVariables = {
    bookId: number;
    libraryId?: number;
  };

  const addBookMutation = useMutation({
    mutationFn: (bookId: number) => postLibraryBook(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["libraryBooks"] });
    },
  });

  const deleteBookMutation = useMutation({
    mutationFn: ({ bookId }: LibraryBookRegisterVariables) =>
      deleteLibraryBook(bookId),
    onSuccess: (_, { libraryId }) => {
      queryClient.invalidateQueries({ queryKey: ["libraryBooks"] });
      queryClient.invalidateQueries({
        queryKey: ["bookTimeline", "infinite", libraryId],
      });
    },
  });

  const patchBookStatusMutation = useMutation({
    mutationFn: (params: { bookId: number; readingStatus: BookStatusType }) =>
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
