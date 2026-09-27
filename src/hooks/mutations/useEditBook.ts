import { useMutation } from "@tanstack/react-query";
import {
  editUserBook,
  type CreateUserBookParams,
  type BookDetail,
} from "../../api/book";

export function useEditUserBook() {
  return useMutation<
    BookDetail,
    Error,
    { bookId: number; params: CreateUserBookParams }
  >({
    mutationFn: ({ bookId, params }) => editUserBook(bookId, params),
  });
}
