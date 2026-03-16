import { useMutation } from "@tanstack/react-query";
import {
  createUserBook,
  type CreateUserBookParams,
  type BookDetail,
} from "../../api/book";

export function useCreateUserBook() {
  return useMutation<BookDetail, Error, CreateUserBookParams>({
    mutationFn: createUserBook,
  });
}